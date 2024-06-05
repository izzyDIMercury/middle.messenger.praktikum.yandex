import Handlebars from "handlebars";
import { v4 as makeUUID } from "uuid";
import EventBus from './eventBus.js';

class Block<Props> {
  children: Partial<Props> | {};

  eventBus: Function;

  props: Partial<Props> | {};

  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  private element: Element | null = null;

  private meta: { tagName: string, props: Partial<Props> } | null = null;

  id: number | string | null;
  // private id: number | string | null = null;

  constructor(tagName: string = "div", propsAndChildren: Props) {
    const { children, props } = this.getChildren(propsAndChildren);
    this.children = children;

    const eventBus = new EventBus();

    this.meta = {
      tagName,
      props,
    };

    const createdId = makeUUID();
    this.id = createdId as string;

    this.eventBus = () => eventBus;

    this.registerEvents(eventBus);

    this.props = this.makePropsProxy({ ...props, id: this.id });

    eventBus.emit(Block.EVENTS.INIT);
  }

  // Preparations:

  private registerEvents(eventBus: InstanceType<typeof EventBus>): void {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private getChildren(propsAndChildren: any): { children: Partial<Props>, props: Partial<Props> } {
    const children: Record<string, any> = {};
    const props: Record<string, any> = {};
    // any используется, так как у пропсов и чилдренов может быть значение любого типа

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children: children as Partial<Props>, props: props as Partial<Props> };
  }

  private makePropsProxy(props: Partial<Props>): any {
    // any используется для Proxy объекта, не нашел вариант, как иначе задать типы для Proxy
    const self = this;
    const eventBus = this.eventBus();
    const proxy = new Proxy<any>(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target };
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
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
    // console.log(this.children);

    Object.values(this.children).forEach((child) => {
      const value = child as InstanceType<typeof Block>;
      value.dispatchComponentDidMount();
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
    // const { block, newElement } = this.compile(this.props);
    const newElement = this.compile(this.props) as HTMLElement;
    // console.log(newElement);

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
    const { events = {} } = this.props as unknown as { events: { [key: string]: any } };
    // console.log(this.props);
    Object.keys(events).forEach((eventName) => {
      this.element?.addEventListener(eventName, events[eventName as keyof typeof events]);
    });
  }

  removeEvents(): void {
    const { events = {} } = this.props as unknown as { events: { [key: string]: any } };
    Object.keys(events).forEach((eventName) => {
      this.element?.removeEventListener(eventName, events[eventName as keyof typeof events]);
    });
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

    Object.assign(this.props, newProps);
  }

  compile(props: Partial<Props>) {
    const propsAndStubs: Record<string, any> = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      const value = child as unknown as InstanceType<typeof Block>;
      propsAndStubs[key] = `<div data-id=${value.id}></div>`;
    });

    const fragment = this.createDocumentElement("template") as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);
    const newElement = fragment.content.firstElementChild;

    Object.values(this.children).forEach((child) => {
      const value = child as unknown as InstanceType<typeof Block>;
      const stub = fragment.content.querySelector(`[data-id="${value.id}"]`);
      stub?.replaceWith(value.getContent());
    });
    // const block = fragment.content;
    return newElement;
    // return { block, newElement };
  }
}

export default Block;
