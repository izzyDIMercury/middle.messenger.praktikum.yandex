import Handlebars from "handlebars";
import EventBus from "./eventBus.js";
import {v4 as makeUUID} from 'uuid';

type Props = Record<string, string | Function>;
type Children = Record<string, InstanceType<any>>;

class Block {

    children: Children;
    eventBus: Function;
    props: Props;

    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    }

    private element: Element | null = null;
    private meta: { tagName: string, props: Props } | null = null;
    private id: number | string | null = null;

    constructor(tagName: string = "div", propsAndChildren: Props | Children) {

        const { children, props } = this.getChildren(propsAndChildren);
        this.children = children;

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

        // console.log(this.props);
        eventBus.emit(Block.EVENTS.INIT);
    }

    // Preparations:

    private registerEvents(eventBus: InstanceType<typeof EventBus>): void {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this.componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private getChildren(propsAndChildren: Props | Children): { children: Children, props: Props } {
        const children: Children = {};
        const props: Props = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        })

        return { children, props };
    }

    private makePropsProxy(props: Props): any {
        const self = this;
        const eventBus = this.eventBus();
        const proxy = new Proxy(props, {
            get(target: Props, prop: string) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target: Props, prop: string, value: string) {
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

    init(): void {
        this.createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
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

    componentDidMount(oldProps: Props) {
        Object.values(this.children).forEach(child => {
            child.dispatchComponentDidMount();
        });
    }

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
        const { block, newElement } = this.compile(this.props);

        if (this.element) {
            this.element.replaceWith(newElement);
        }
    
        this.element = newElement;

        this.addEvents();
    }

    render() {

    }

    // Events:

    addEvents(): void {
        const { events = {} } = this.props;
        Object.keys(events).forEach(eventName => {
            this.element?.addEventListener(eventName, events[eventName as keyof typeof events]);
        })
    }

    removeEvents(): void {
        const { events = {} } = this.props;
        Object.keys(events).forEach(eventName => {
            this.element?.removeEventListener(eventName, events[eventName as keyof typeof events]);
        })
    }

    // Other:

    getContent(): Element {
        const element = this.element as Element;
        //
        // console.log(this.props, element);
        //
        return element;
    }

    setProps(newProps: Props): void {
        if (!newProps) {
            return;
        }

        Object.assign(this.props, newProps);
    }

    compile(props: Props) {
        const propsAndStubs = { ...props };

        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id=${child.id}></div>`
        })

        const fragment = this.createDocumentElement("template");
        fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);
        const newElement = fragment.content.firstElementChild;

        Object.values(this.children).forEach(child => {
            const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
            stub.replaceWith(child.getContent());
        })
        const block = fragment.content;
        return { block, newElement };
    }

    show(): void {
        this.getContent().style.display = "block";
    }
      
    hide(): void {
        this.getContent().style.display = "none";
    }
}

export default Block;
