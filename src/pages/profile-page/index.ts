import "./profile-page.scss";
export { default as ProfilePage } from "./profile-page.hbs?raw";

import Handlebars from "handlebars";
import ProfilePlaceholder from "/assets/profile-placeholder.png";

Handlebars.registerHelper("profilePlaceholder", () => {
    return ProfilePlaceholder
})
