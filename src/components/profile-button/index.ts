import "./profile-button.scss";
export { default as ProfileButton } from "./profile-button.hbs?raw";

import Handlebars from "handlebars";
import ProfileButtonIcon from "/assets/icons/profile.png";

Handlebars.registerHelper('profileButtonIcon', () => {
    return ProfileButtonIcon
})
