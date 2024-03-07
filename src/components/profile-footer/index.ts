import Handlebars from "handlebars";
import "./profile-footer.scss";
export { default as ProfileFooter } from "./profile-footer.hbs?raw";


Handlebars.registerHelper("profile-footer-buttons", () => {
    return [
        {
            classModifier: "",
            page: "profile-change-data",
            text: "Изменить данные"
        },
        {
            classModifier: "",
            page: "profile-change-password",
            text: "Изменить пароль"
        },
        {
            classModifier: "profile-footer-button_red",
            page: "profile",
            text: "Выйти"
        }
    ]
})