import { Store } from "./core/store.ts";

const store = new Store({
    isLoading: false,
    isError: false,
    imageLink: "",
    usersFound: [],
    chats: {},
    length: 0, //
    activeChat: {
        chat: {},
        isActive: false
    },
    currentMessage: ""
});

interface WindowStoreType {
    store: {
        [key: string]: any
    },
    router: any,
    setState: Function
}

const WindowStore = window as unknown as WindowStoreType;
WindowStore.store = store;

export { WindowStore };
