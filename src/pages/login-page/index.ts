import Handlebars from "handlebars";
import "./login-page.scss";
export { default as LoginPage } from "./login-page.hbs?raw";

Handlebars.registerHelper("login-fields", () => {
    return [
        {
            className: "login-page__input",
            title: "Логин",
            name: "login",
            type: "text"
        },
        {
            className: "login-page__input",
            title: "Пароль",
            name: "password",
            type: "password"
        }
    ]
})
