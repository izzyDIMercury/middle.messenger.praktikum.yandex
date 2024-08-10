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
//@ts-expect-error can't properly type window.store
window.router = router;
//@ts-expect-error can't properly type window.store
window.router.use("/", Pages.LoginPage as any);
//@ts-expect-error can't properly type window.store
window.router.use("/messenger", Pages.ChatPage as any);
//@ts-expect-error can't properly type window.store
window.router.use("/sign-up", Pages.RegisterPage as any);
//@ts-expect-error can't properly type window.store
window.router.use("/settings", Pages.ProfilePage as any);
//@ts-expect-error can't properly type window.store
window.router.use("/profile-change-data", Pages.ProfileChangeDataPage as any);
//@ts-expect-error can't properly type window.store
window.router.use("/profile-change-password", Pages.ProfileChangePasswordPage as any);
//@ts-expect-error can't properly type window.store
window.router.use("/404", Pages.Page404 as any);
//@ts-expect-error can't properly type window.store
window.router.use("/500", Pages.Page500 as any);
//@ts-expect-error can't properly type window.store
window.router.start();
console.log("here")


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
    //@ts-expect-error can't properly type window.store
    window.router.go(`/${page}`);
});

// export { WindowStore };

