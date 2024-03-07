import Handlebars from "handlebars";
import "./chat-page.scss";
export { default as ChatPage } from "./chat-page.hbs?raw";

Handlebars.registerHelper("left-column-users", () => {
    return [
        {
            name: "Илья", 
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
            unread: "2", 
            image: "/assets/cat.jpg", 
            time: "10:49",
            selected: ""
        },
        {
            name: "Петр", 
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
            unread: "", 
            image: "", 
            time: "Пн",
            selected: "selected"
        },
        {
            name: "Пользователь", 
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
            unread: "", 
            image: "", 
            time: "Пн",
            selected: ""
        },
        {
            name: "Пользователь", 
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
            unread: "", 
            image: "", 
            time: "Пн",
            selected: ""
        },
        {
            name: "Пользователь", 
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
            unread: "", 
            image: "", 
            time: "Пн",
            selected: ""
        },
        {
            name: "Пользователь", 
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
            unread: "", 
            image: "", 
            time: "Пн",
            selected: ""
        },
        {
            name: "Пользователь", 
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
            unread: "", 
            image: "", 
            time: "Пн",
            selected: ""
        },
        {
            name: "Пользователь", 
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
            unread: "", 
            image: "", 
            time: "Пн",
            selected: ""
        },
        {
            name: "Пользователь", 
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
            unread: "", 
            image: "", 
            time: "Пн",
            selected: ""
        },
        {
            name: "Пользователь", 
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
            unread: "", 
            image: "", 
            time: "Пн",
            selected: ""
        },
        {
            name: "Пользователь", 
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
            unread: "", 
            image: "", 
            time: "Пн",
            selected: ""
        },
        {
            name: "Пользователь", 
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
            unread: "", 
            image: "", 
            time: "Пн",
            selected: ""
        },
        {
            name: "Пользователь", 
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
            unread: "", 
            image: "", 
            time: "Пн",
            selected: ""
        },
        {
            name: "Пользователь", 
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
            unread: "", 
            image: "", 
            time: "Пн",
            selected: ""
        },
        {
            name: "Пользователь", 
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
            unread: "", 
            image: "", 
            time: "Пн",
            selected: ""
        }
    ]
})