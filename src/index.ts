import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";

const pages = {
    "chat": [ Pages.ChatPage ],
    "login": [ Pages.LoginPage ],
    "register": [ Pages.RegisterPage ],
    "profile": [ Pages.ProfilePage ]
};

Object.entries(Components).forEach(([ name, component ]) => {
    Handlebars.registerPartial(name, component);
})

function navigate(page) {
    const [ source, args ] = pages[page];
    const handlebarsFunct = Handlebars.compile(source);
    const root = document.querySelector("#app");
    root.innerHTML = handlebarsFunct(args);
}

document.addEventListener("DOMContentLoaded", navigate("profile"));

document.addEventListener("click", e => {
    const page = e.target.getAttribute("page");
    if (page) {
        navigate(page);

        e.preventDefault();
        e.stopImmediatePropagation();
    }
})