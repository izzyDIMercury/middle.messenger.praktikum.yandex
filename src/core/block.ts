import Handlebars from "handlebars";
import EventBus from "./eventBus.js";
import {v4 as makeUUID} from 'uuid';


// interface Prop {[key: string]: any};
// interface Child {[key: string]: any};
// type Empty = {};
// type propsAndChildren = Record<string, any>;

// type BlockChildren = {[key: string]: any} | {};
// type BlockProps = {[key: string]: any} | {};
// type DefinedProps = {[key: string]: any};
// type DefinedChildren = {[key: string]: any}


class Block<Props> {

    children: Partial<Props>;
    eventBus: Function;
    props: Partial<Props>;

    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    }

    private element: Element | null = null;
    private meta: { tagName: string, props: {} } | null = null;
    id: number | string;
     // private id: number | string | null = null;

    constructor(tagName: string = "div", propsAndChildren: Props) {

        const { children, props } = this.getChildren(propsAndChildren);
        this.children = children;
        console.log(propsAndChildren);

        const eventBus = new EventBus();
        
        this.meta = {
            tagName,
            props
        }
        
        const createdId = makeUUID();
        this.id = createdId as string;

        this.eventBus = () => eventBus;

        this.registerEvents(eventBus);

        this.props = this.makePropsProxy({ ...props, id: this.id });

        eventBus.emit(Block.EVENTS.INIT);
    }

    // Preparations:

    private registerEvents(eventBus: InstanceType<any>): void {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private getChildren(propsAndChildren: Props): { children: Partial<Props>, props: Partial<Props> } {
        const children: Props | {} = {};
        const props: Props | {} = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        })

        return { children, props };
    }

    private makePropsProxy(props: BlockProps): any {
        const self = this;
        const eventBus = this.eventBus();
        const proxy = new Proxy<any>(props, {
            get(target: {[key: string]: any}, prop: string) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target: {[key: string]: any}, prop: string, value: string) {
                const oldTarget = {...target}
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            }
        })
        return proxy;
    }

    // Initialization:

    _init(): void {
        this.init();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    init(): void {

    }

    private createResources(): void {
        const tagName = this.meta?.tagName;
        this.element = this.createDocumentElement(tagName as string);
    }

    private createDocumentElement(tagName: string): Element {
        const id = this.id as string;
        const element = document.createElement(tagName);
        element.setAttribute("data-id", id);
        return element;
    }

    // CDM:

    private _componentDidMount(): void {
        this.componentDidMount();
        // console.log('CDM');

        Object.values(this.children).forEach(child => {
            child.dispatchComponentDidMount();
        });
    }

    componentDidMount(oldProps?: Props) {}

    private dispatchComponentDidMount(): void {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    // CDU:

    _componentDidUpdate(oldProps: Props, newProps: Props) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }
      
    componentDidUpdate(oldProps: Props, newProps: Props) {
        return true;
    }

    // Render:

    _render(): void {
        const { block, newElement } = this.compile(this.props) as {[key: string]: any};

        if (this.element) {
            this.element.replaceWith(newElement);
        }
    
        this.element = newElement;

        this.addEvents();
        this.dispatchComponentDidMount();
    }

    render() {

    }

    // Events:

    addEvents(): void {
        const { events = {} } = this.props as any;
        Object.keys(events).forEach(eventName => {
            this.element?.addEventListener(eventName, events[eventName as keyof typeof events]);
        })
    }

    removeEvents(): void {
        const { events = {} } = this.props as any;
        Object.keys(events).forEach(eventName => {
            this.element?.removeEventListener(eventName, events[eventName as keyof typeof events]);
        })
    }

    // Other:

    getContent(): Element {
        const element = this.element as Element;
        return element;
    }

    setProps(newProps: Props): void {
        if (!newProps) {
            return;
        }

        // console.log(this.props);

        Object.assign(this.props, newProps);
    }

    compile(props: Props) {
        const propsAndStubs: {[key: string]: any} = { ...props };

        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id=${child.id}></div>`
        })

        const fragment = this.createDocumentElement("template") as HTMLTemplateElement;
        fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);
        const newElement = fragment.content.firstElementChild;

        Object.values(this.children).forEach(child => {
            const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
            stub?.replaceWith(child.getContent());
        })
        const block = fragment.content;
        return { block, newElement };
    }
}

export default Block;
