import "./message-panel.scss";
export { default as MessagePanel } from "./message-panel.hbs?raw";

import Handlebars from "handlebars";
import ClipIcon from "/assets/icons/clip.png";

Handlebars.registerHelper("clipIcon", () => {
    return ClipIcon
})