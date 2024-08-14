import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";
import Router from "./core/router.ts";
// import { Store } from "./core/store.ts";
import { globalStore } from "./store.ts";


//@ts-expect-error can't properly type window.store
window.store = globalStore;

Object.entries(Components).forEach(([ name, component ]) => {
    Handlebars.registerPartial(name, component as any);
})


const router = new Router("#app");
//@ts-expect-error window
window.router = router;
router.use("/", Pages.LoginPage as any);
router.use("/messenger", Pages.ChatPage as any);
router.use("/sign-up", Pages.RegisterPage as any);
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

// export { WindowStore };

