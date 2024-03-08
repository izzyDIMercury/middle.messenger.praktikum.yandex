import "./return-button.scss";
export { default as ReturnButton } from "./return-button.hbs?raw";

import Handlebars from "handlebars";
import ArrowLeft from "/assets/icons/arrow-left.png";

Handlebars.registerHelper("arrowLeft", () => {
    return ArrowLeft
})
