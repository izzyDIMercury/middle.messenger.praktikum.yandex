import Block from "../../core/block.ts";
import Image from "../image/image.ts";
import type { StoreType } from "../../types.ts";
import { connect } from "../../core/connect.ts";
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
        event.preventDefault();
        const target = event.target as HTMLElement;
        const className = target.getAttribute("class");
        if (className === "chat-profile__settings-icon") {
            //@ts-expect-error window problem            
            window.store.setState({ modalOpened: true });
        } else {
            //@ts-expect-error window problem  
            window.store.setState({ modalOpened: false });
        }

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
        return true;
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
                            {{#if modalOpened}}
                                {{{ Modal }}}
                            {{/if}}
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
