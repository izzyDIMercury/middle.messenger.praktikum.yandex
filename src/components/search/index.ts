import "./search.scss";
export { default as Search } from "./search.hbs?raw";

import Handlebars from "handlebars";
import SearchIcon from "/assets/icons/search.png";

Handlebars.registerHelper("searchIcon", () => {
    return SearchIcon
})
