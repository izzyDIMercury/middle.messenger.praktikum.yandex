import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";
import Block from "./core/block.ts";

type PagesType = Record<string, any>;

const pages: PagesType = {
    "chat": [ Pages.ChatPage ],
    "login": [ Pages.LoginPage ],
    "register": [ Pages.RegisterPage ],
    "profile": [ Pages.ProfilePage ],
    "profile-change-data": [ Pages.ProfileChangeDataPage ],
    "profile-change-password": [ Pages.ProfileChangePasswordPage ],
    "404": [ Pages.Page404 ],
    "500": [ Pages.Page500 ],
};


Object.entries(Components).forEach(([ name, component ]) => {
    Handlebars.registerPartial(name, component as any);
})

export function navigate(page: string): void {
    const [ source, context ] = pages[page];
    const root = document.querySelector<HTMLElement>("#app");

    if (source instanceof Object && root !== null) {
        const page = new source(context);
        root.innerHTML = "";
        root.append(page.getContent());
        return;
    }

    if (root !== null) {
        root.innerHTML = Handlebars.compile(source)(context);
    }
}

document.addEventListener("DOMContentLoaded", navigate("profile"));


// document.addEventListener("click", e => {
//     const page = e.target.getAttribute("page");
//     if (page) {
//         navigate(page);

//         e.preventDefault();
//         e.stopImmediatePropagation();
//     }
// })

document.addEventListener("switchPage", event => {
    navigate(event.detail.page);
});

// document.dispatchEvent(new CustomEvent("switchPage", { detail: "mydetail" }));
