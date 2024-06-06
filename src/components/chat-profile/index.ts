import "./chat-profile.scss";
export { default as ChatProfile } from "./chat-profile.hbs?raw";

import Handlebars from "handlebars";
import Cat from "/assets/cat.jpg";
import SettingsIcon from "/assets/icons/settings.png";

Handlebars.registerHelper("cat", () => {
    return Cat
})

Handlebars.registerHelper("settingsIcon", () => {
    return SettingsIcon
})
