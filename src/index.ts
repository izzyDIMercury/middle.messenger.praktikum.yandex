import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";
import Router from "./core/router.ts";
import { Store } from "./core/store.ts";

const store = new Store({
    isLoading: false,
    isError: false,
    imageLink: "",
    userFound: {}
});

window.store = store;


Object.entries(Components).forEach(([ name, component ]) => {
    Handlebars.registerPartial(name, component as any);
})


const router = new Router("#app");
window.router = router;

router.use("/", Pages.LoginPage);
router.use("/messenger", Pages.ChatPage);
router.use("/sing-up", Pages.RegisterPage);
router.use("/settings", Pages.ProfilePage);
router.use("/profile-change-data", Pages.ProfileChangeDataPage);
router.use("/profile-change-password", Pages.ProfileChangePasswordPage);
router.use("/404", Pages.Page404);
router.use("/500", Pages.Page500);
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

