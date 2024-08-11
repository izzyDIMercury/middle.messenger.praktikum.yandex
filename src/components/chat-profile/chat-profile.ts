import Block from "../../core/block.ts";
import Image from "../image/image.ts";
import type { StoreType } from "../../types.ts";
import { connect } from "../../core/connect.ts";
import Chat from "../../controllers/chat.ts";

type ChatProfileProps = object;

type ChatType = {
    title: string,
    id: number,
    avatar: string | null
}

class ChatProfile extends Block<ChatProfileProps> {
    constructor(props: ChatProfileProps) {
        super({
            ...props
        });
    }

    init() {
        const deleteChatBind = this.deleteChat.bind(this);

        const Profile = new Image({
            className: "chat-profile__user-image",
            src: "/assets/profile-placeholder-small.png",
            alt: "Аватар пользователся",
            page: "chat"
        })

        const Button = new Image({
            className: "chat-profile__settings-icon",
            src: "/assets/icons/settings.png",
            alt: "Аватар пользователся",
            page: "chat",
            events: {
                click: deleteChatBind
            }
        });

        this.children = {
            Button,
            Profile
        };
    }

    deleteChat() {
        const chatProps = this.props as { activeChat: { chat: { id: number }}};
        const chatId = chatProps.activeChat.chat.id;
        const controller = new Chat();
        controller.deleteChat(chatId);
    }

    private handleActiveChat(chat: ChatType) {
        const userName = document.querySelector(".chat-profile__user-name") as HTMLParagraphElement;
        userName.textContent = chat.title;
        console.log(chat.title)

        if (!chat.avatar) {
            return;
        }
        const image = document.querySelector(".chat-profile__user-image") as HTMLImageElement;
        const link = "https://ya-praktikum.tech/api/v2/resources" + chat.avatar;
        image.src = link;
    }

    componentDidUpdate(): boolean | void {
        const propsClone = this.props as { activeChat: ChatType };
        this.handleActiveChat(propsClone.activeChat);
    }

    render() {
        return (
            `
                    <nav class="chat-profile">
                        <div class="chat-profile__user">
                            {{{ Profile }}}
                            <p class="chat-profile__user-name">Илья</p>
                        </div>
                        <div class="chat-profile__settings-button" page="{{ login }}">
                            {{{ Button }}}
                        </div>
                    </nav>
                `
        );
    }
}

const mapStateToPropsShort = (props: StoreType): object => {
    return {
        activeChat: props.activeChat
    }
}

// avatar: props.userInfo.avatar,

export default connect(mapStateToPropsShort)(ChatProfile);
