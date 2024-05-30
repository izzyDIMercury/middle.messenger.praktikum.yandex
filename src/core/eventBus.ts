type Listeners = Record<string, Function[]>;

class EventBus {

    listeners: Listeners

    constructor() {
        this.listeners = {};
    }
    on(event: string, callback: Function) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }
    off(event: string, callback: Function) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
        this.listeners[event].filter((listener: Function) => callback != listener);
    }
    emit(event: string, ...args: (string | object)[]) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
        this.listeners[event].forEach((listener: Function) => {
            listener(...args);    
        })
    }
}

export default EventBus;
