import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";
import Router from "./core/router.ts";
import { Store } from "./core/store.ts";

const store = new Store({
    isLoading: false,
    isError: false,
    imageLink: "",
    userFound: {},
    chats: {},
    length: 0, //
    activeChat: {
        chat: {},
        isActive: false
    },
    currentMessage: ""
});

interface WindowStore {
    store: {
        [key: string]: any
    },
    router: any
}

const windowStore = window as unknown as WindowStore;
windowStore.store = store;


Object.entries(Components).forEach(([ name, component ]) => {
    Handlebars.registerPartial(name, component as any);
})


const router = new Router("#app");
windowStore.router = router;

router.use("/", Pages.LoginPage as any);
router.use("/messenger", Pages.ChatPage as any);
router.use("/sing-up", Pages.RegisterPage as any);
router.use("/settings", Pages.ProfilePage as any);
router.use("/profile-change-data", Pages.ProfileChangeDataPage as any);
router.use("/profile-change-password", Pages.ProfileChangePasswordPage as any);
router.use("/404", Pages.Page404 as any);
router.use("/500", Pages.Page500 as any);
router.start();


interface PageCustomEvent extends CustomEvent {
    detail: {
        page: string
    }
}

document.addEventListener("switchPage", event => {
    const eventDetail = event as PageCustomEvent;
    let page = eventDetail.detail.page as string || "";
    if (page === "login") {
        page = "";
    }
    router.go(`/${page}`);
});

