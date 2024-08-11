import Block from "../../core/block.ts";
import Image from "../image/image.ts";
import type { StoreType } from "../../types.ts";
import { connect } from "../../core/connect.ts";
import Chat from "../../controllers/chat.ts";
import ChatModalWindow from "../chat-modal-window/chat-modal-window.ts";

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
        const handleModalBind = this.handleModal.bind(this);

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
                click: () => {}
            }
        });

        const Modal = new ChatModalWindow({});

        this.children = {
            Button,
            Profile,
            Modal
        };

        document.addEventListener("click", this.handleModal);
    }

    handleModal(event: MouseEvent) {
        const className = event.target.getAttribute("class");
        if (className === "chat-profile__settings-icon") {
            window.store.setState({ modalOpened: true });
        } else {
            window.store.setState({ modalOpened: false });
        }

    }

    deleteChat() {
        const chatProps = this.props as { activeChat: { id: number }};
        const chatId = chatProps.activeChat.id;
        const controller = new Chat();
        controller.deleteChat(chatId);
    }

    private handleActiveChat(chat: ChatType) {
        const userName = document.querySelector(".chat-profile__user-name") as HTMLParagraphElement;
        userName.textContent = chat.title;

        if (!chat.avatar) {
            return;
        }
        const image = document.querySelector(".chat-profile__user-image") as HTMLImageElement;
        const link = "https://ya-praktikum.tech/api/v2/resources" + chat.avatar;
        image.src = link;
    }

    componentDidUpdate(): boolean | void {
        const propsClone = this.props as { activeChat: ChatType, modalOpened: boolean };
        this.handleActiveChat(propsClone.activeChat);

        if (propsClone.modalOpened === true) {
            const modal = document.querySelector(".modal-window") as HTMLElement;
            modal.setAttribute("style", `display: block`);
        } else if (propsClone.modalOpened === false) {
            const modal = document.querySelector(".modal-window") as HTMLElement;
            modal.setAttribute("style", `display: none`);
        }
    }

    componentWillUnmount(): void {
        
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
                            {{{ Modal }}}
                            {{{ Button }}}
                        </div>
                    </nav>
                `
        );
    }
}

const mapStateToPropsShort = (props: StoreType): object => {
    return {
        activeChat: props.activeChat,
        modalOpened: props.modalOpened
    }
}

// avatar: props.userInfo.avatar,

export default connect(mapStateToPropsShort)(ChatProfile);
