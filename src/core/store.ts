export default class Store {
    private state: Object = {
        game: "halo 2",
        platforms: {
            xbox: 2004,
            pc: 2007
        }
    };

    public getState() {
        return this.state;
    }

    public setState(path: string, value: unknown) {
        set(this.state, path, value);
    }
}

type Indexed<T = unknown> = {
    [key in string]: T;
}

function set(state: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof path !== "string") {
        throw new Error("Путь должен быть строкой!");
    }

    const stateCopy = state as Indexed;
    if (stateCopy.constructor !== Object) {
        return state;
    }

    const newProp: Partial<Indexed> = {};
    const paths: string[] = path.split(".");

    paths.reduce((source: any, cur: any) => {
        return cur === paths[paths.length - 1] ? (source[cur] = value) : (source[cur] = {});
    }, newProp);

    console.log(state, newProp)
    merge(stateCopy, newProp);
    return stateCopy;
}

function merge(state: Indexed, newProp: Indexed): Indexed {
    const propCopy: Partial<Indexed> = newProp;
    for (const p in propCopy) {
        if (propCopy[p].constructor === Object) {
            propCopy[p] = merge(state[p] as Indexed, newProp[p] as Indexed);
        } else {
            state[p] = propCopy[p];
        }
    }
    return state;
}
