import "./user.scss";
export { default as User } from "./user.hbs?raw";

import Handlebars from "handlebars";
import UserImagePlaceholder from "/assets/icons/profile-placeholder.png";

Handlebars.registerHelper("userImagePlaceholder", () => {
    return UserImagePlaceholder
})
