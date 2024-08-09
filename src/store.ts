import { Store } from "./core/store.ts";

type GlobalStoreStype = {
    getState: Function,
    setState: Function,
    on: Function
}
 
const GlobalStore: GlobalStoreStype = new Store({
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
    currentMessage: "",
    doFillProps: true,
    userInfo: {
        avatar: null,
        display_name: null,
        email: null,
        first_name: null,
        id: null,
        login: null,
        phone: null,
        second_name: null
    }
});


export { GlobalStore };
