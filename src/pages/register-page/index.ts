import Handlebars from "handlebars";
import "./register-page.scss";
export { default as RegisterPage } from "./register-page.hbs?raw";

Handlebars.registerHelper("register-fields", () => {
    return [
        {
            className: "register-page__input",
            title: "Почта",
            name: "email",
            type: "email"
        },
        {
            className: "register-page__input",
            title: "Логин",
            name: "login",
            type: "text"
        },
        {
            className: "register-page__input",
            title: "Имя",
            name: "first_name",
            type: "text"
        },
        {
            className: "register-page__input",
            title: "Фамилия",
            name: "second_name",
            type: "text"
        },
        {
            className: "register-page__input",
            title: "Телефон",
            name: "phone",
            type: "tel"
        },
        {
            className: "register-page__input",
            title: "Пароль",
            name: "password",
            type: "password"
        },
        {
            className: "register-page__input",
            title: "Пароль (еще раз)",
            name: "password",
            type: "password"
        }
    ]
})
