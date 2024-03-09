import "./profile-change-password-page.scss";
export { default as ProfileChangePasswordPage } from "./profile-change-password-page.hbs?raw";

import Handlebars from "handlebars";
import ProfilePlaceholder from "/assets/profile-placeholder.png";

Handlebars.registerHelper("profilePlaceholder", () => {
    return ProfilePlaceholder
})
