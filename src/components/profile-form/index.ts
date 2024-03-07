import Handlebars from "handlebars";
import "./profile-form.scss";
export { default as ProfileForm } from "./profile-form.hbs?raw";

Handlebars.registerHelper("profile-form-items", () => {
    return [
        {
            className: "profile-form__input",
            title: "Почта",
            name: "email",
            type: "email"
        },
        {
            className: "profile-form__input",
            title: "Логин",
            name: "login",
            type: "text"
        },
        {
            className: "profile-form__input",
            title: "Имя",
            name: "first-name",
            type: "text"
        },
        {
            className: "profile-form__input",
            title: "Фамилия",
            name: "last-name",
            type: "text"
        },
        {
            className: "profile-form__input",
            title: "Имя в чате",
            name: "chat-name",
            type: "text"
        },
        {
            className: "profile-form__input",
            title: "Телефон",
            name: "tel",
            type: "tel"
        }
    ]
})