import Block from "../../core/block.ts";
import Image from "../image/image.ts";


export default class ChatProfile extends Block {

    constructor(props) {
        super("form", {
            ...props
        })
    }

    init() {
        const Cat = new Image({
            className: "chat-profile__user-image",
            src: "/assets/cat.jpg",
            alt: "Аватар пользователся"
        })
        const SettingsIcon = new Image({
            className: "chat-profile__settings-icon",
            src: "/assets/icons/settings.png",
            alt: "Аватар пользователся",
            page: "login"
        })

        this.children = {
            Cat,
            SettingsIcon
        }
    }


    render() {
        return (
                `
                    <nav class="chat-profile">
                        <div class="chat-profile__user">
                            {{{ Cat }}}
                            <p class="chat-profile__user-name">Илья</p>
                        </div>
                        <div class="chat-profile__settings-button" page="{{ login }}">
                            {{{ SettingsIcon }}}
                        </div>
                    </nav>
                `
        )
    }
}
