import Block from "../../core/block.ts";
// import { switchPage } from "../../core/utils.ts";
// import Image from "../image/image.ts";
import ProfileImage from "../profile-image/profile-image.ts";
import type { StoreType } from "../../types.ts";
import { connect } from "../../core/connect.ts";
import { UserInfo } from "../../types.ts";
import Chat from "../../controllers/chat.ts";

type ChatProfileProps = object;

class ChatProfile extends Block<ChatProfileProps> {
    constructor(props: ChatProfileProps) {
        super({
            ...props
        });
    }

    init() {
        const deleteChatBind = this.deleteChat.bind(this);

        const Profile = new ProfileImage({
            className: "chat-profile__user-image",
            src: "/assets/profile-placeholder-small.png",
            alt: "Аватар пользователся",
            path: ""
        })

        const Button = new DeleteButton({
            events: {
                click: deleteChatBind
            }
        })
        // const SettingsIcon = new Image({
        //     className: "chat-profile__settings-icon",
        //     src: "/assets/icons/settings.png",
        //     alt: "Аватар пользователся",
        //     page: "login",
        //     events: {
        //         click: deleteChatBind
        //     },
        //     path: ""
        // });

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

    private handleActiveChat(chat: object, user: UserInfo) {
        const image = document.querySelector(".chat-profile__user-image") as HTMLImageElement;
        const link = "https://ya-praktikum.tech/api/v2/resources" + user.avatar;
        image.src = link;

        const userName = document.querySelector(".chat-profile__user-name") as HTMLParagraphElement;
        userName.textContent = user.first_name;
    }

    componentDidUpdate(): boolean | void {
        const propsClone = this.props as { activeChat: { chat: object, user: UserInfo, isActive: boolean }};
        if (propsClone.activeChat.isActive) {
            this.handleActiveChat(propsClone.activeChat.chat, propsClone.activeChat.user);
        }
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

type DeleteButtonProps = object;

class DeleteButton extends Block<DeleteButtonProps> {

    constructor(props: DeleteButtonProps) {
        super({
            ...props
        })
    }

    render() {
        return (
            `
                <div class="chat-profile__delete-chat">Удалить чат</div>
            `
        )
    }
}

const mapStateToPropsShort = (props: StoreType): object => {
    return {
        avatar: props.userInfo.avatar,
        activeChat: props.activeChat
    }
}

export default connect(mapStateToPropsShort)(ChatProfile);
