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
            name: "first_name",
            type: "text"
        },
        {
            className: "profile-form__input",
            title: "Фамилия",
            name: "last_name",
            type: "text"
        },
        {
            className: "profile-form__input",
            title: "Имя в чате",
            name: "display_name",
            type: "text"
        },
        {
            className: "profile-form__input",
            title: "Телефон",
            name: "phone",
            type: "tel"
        }
    ]
})

Handlebars.registerHelper("profile-password-items", () => {
    return [
        {
            className: "profile-form__input",
            title: "Старый пароль",
            name: "oldPassword",
            type: "password"
        },
        {
            className: "profile-form__input",
            title: "Новый пароль",
            name: "newPassword",
            type: "password"
        },
        {
            className: "profile-form__input",
            title: "Повторите новый пароль",
            name: "newPassword",
            type: "password"
        }
    ]
})