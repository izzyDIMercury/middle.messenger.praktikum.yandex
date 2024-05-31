import Block from "../../core/block.ts";


export default class ChatProfile extends Block {

    constructor(props) {
        super("form", {
            ...props
        })
    }


    render() {
        return (
                `
                    <nav class="chat-profile">
                        <div class="chat-profile__user">
                            <img src="{{ cat }}" alt="Аватар пользователся" class="chat-profile__user-image" />
                            <p class="chat-profile__user-name">Илья</p>
                        </div>
                        <div class="chat-profile__settings-button">
                            <img src="{{ settingsIcon }}" alt="Аватар пользователся" class="chat-profile__settings-icon" />
                        </div>
                    </nav>
                `
        )
    }
}
