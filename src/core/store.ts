import EventBus from "./eventBus";

export enum StoreEvents {
    Updated = "Updated"
}
export class Store extends EventBus {
    private state: Object;

    constructor(defaultState, ...props) {
        super(...props);
        this.state = defaultState;
    }

    public getState() {
        return this.state;
    }

    public setState(nextState) {
        const prevState = { ...this.state };
        this.state = { ...this.state, ...nextState };
        this.emit(StoreEvents.Updated, prevState, nextState);
    }
}

// public setState(path: string, value: unknown) {
//     set(this.state, path, value);
// }

// type Indexed<T = unknown> = {
//     [key in string]: T;
// }

// function set(state: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
//     if (typeof path !== "string") {
//         throw new Error("Путь должен быть строкой!");
//     }

//     const stateCopy = state as Indexed;
//     if (stateCopy.constructor !== Object) {
//         return state;
//     }

//     const newProp: Indexed = {};
//     const paths: string[] = path.split(".");

//     paths.reduce((source: any, cur: any) => {
//         return cur === paths[paths.length - 1] ? (source[cur] = value) : (source[cur] = {});
//     }, newProp);

//     console.log(state, newProp)
//     merge(stateCopy, newProp);
//     return stateCopy;
// }

// function merge(state: Indexed, newProp: Indexed): Indexed {
//     const propCopy: Indexed = newProp;
//     for (const p in propCopy as Indexed) {
//         if (propCopy[p].constructor === Object) {
//             propCopy[p] = merge(state[p] as Indexed, newProp[p] as Indexed);
//         } else {
//             state[p] = propCopy[p];
//         }
//     }
//     return state;
// }
