import "./profile-change-data-page.scss";
export { default as ProfileChangeDataPage } from "./profile-change-data-page.hbs?raw";

import Handlebars from "handlebars";
import ProfilePlaceholder from "/assets/profile-placeholder.png";

Handlebars.registerHelper("profilePlaceholder", () => {
    return ProfilePlaceholder
})
