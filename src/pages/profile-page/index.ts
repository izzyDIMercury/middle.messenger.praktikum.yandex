import Handlebars from "handlebars";
import "./profile-page.scss";
export { default as ProfilePage } from "./profile-page.hbs?raw";

Handlebars.registerHelper("profile-form-items", () => {
    return [
        {
            className: "profile-page__input",
            title: "Почта",
            name: "email",
            type: "email"
        },
        {
            className: "profile-page__input",
            title: "Логин",
            name: "login",
            type: "text"
        },
        {
            className: "profile-page__input",
            title: "Имя",
            name: "first-name",
            type: "text"
        },
        {
            className: "profile-page__input",
            title: "Фамилия",
            name: "last-name",
            type: "text"
        },
        {
            className: "profile-page__input",
            title: "Имя в чате",
            name: "chat-name",
            type: "text"
        },
        {
            className: "profile-page__input",
            title: "Телефон",
            name: "tel",
            type: "tel"
        }
    ]
})

Handlebars.registerHelper("profile-footer-buttons", () => {
    return [
        {
            classModifier: "",
            page: "profile",
            text: "Изменить данные"
        },
        {
            classModifier: "",
            page: "profile",
            text: "Изменить пароль"
        },
        {
            classModifier: "profile-footer-button_red",
            page: "profile",
            text: "Выйти"
        }
    ]
})