import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";
import Router from "./core/router.ts";

type PagesType = Record<string, any>;

const pages: PagesType = {
    "chat": [ Pages.ChatPage ],
    "login": [ Pages.LoginPage ],
    "register": [ Pages.RegisterPage ],
    "profile": [ Pages.ProfilePage ],
    "profile-change-data": [ Pages.ProfileChangeDataPage ],
    "profile-change-password": [ Pages.ProfileChangePasswordPage ],
    "404": [ Pages.Page404 ],
    "500": [ Pages.Page500 ]
};


Object.entries(Components).forEach(([ name, component ]) => {
    Handlebars.registerPartial(name, component as any);
})

export function navigate(page: string) {
    const [ source, context ] = pages[page];
    const root = document.querySelector<HTMLElement>("#app");

    if (source instanceof Object && root !== null) {
        // const page = new source(context);
        const page = new source();
        root.innerHTML = "";
        root.append(page.getContent());
        return;
    }

    // if (root !== null) {
    //     root.innerHTML = Handlebars.compile(source)(context);
    // }
}

const router = new Router("#app");
router.use("/", Pages.LoginPage);
router.use("/chat", Pages.ChatPage);
router.use("/register", Pages.RegisterPage);
router.use("/profile", Pages.ProfilePage);
router.use("/profile-change-data", Pages.ProfileChangeDataPage);
router.use("/profile-change-password", Pages.ProfileChangePasswordPage);
router.use("/404", Pages.Page404);
router.use("/500", Pages.Page500);
router.start();
// console.log(router);


interface PageCustomEvent extends CustomEvent {
    detail: {
        page: string
    }
}

document.addEventListener("onContentLoad", event => {
    const eventDetail = event as PageCustomEvent;
    const page = eventDetail.detail.page as string;
    navigate(page);
})

// document.addEventListener("DOMContentLoaded", () => {
//     document.dispatchEvent(new CustomEvent("onContentLoad", {

//         // здесь можно задать начальную страницу:
//         detail: {
//             page: "login"
//         }
//     }));
// })

document.addEventListener("switchPage", event => {
    const eventDetail = event as PageCustomEvent;
    const page = eventDetail.detail.page as string;
    router.go(`/${page}`);
    // navigate(page);
});




// document.addEventListener("DOMContentLoaded", navigate("profile"));

// document.addEventListener("click", e => {
//     const page = e.target.getAttribute("page");
//     if (page) {
//         navigate(page);

//         e.preventDefault();
//         e.stopImmediatePropagation();
//     }
// })
