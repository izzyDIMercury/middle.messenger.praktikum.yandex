import Block from "../../core/block.ts";
import Image from "../image/image.ts";
import type { StoreType } from "../../types.ts";
import { connect } from "../../core/connect.ts";
import ChatModalWindow from "../chat-modal-window/chat-modal-window.ts";
import { BASE_URL } from "../../constants.ts";

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
        // const handleModalBind = this.handleModal.bind(this);
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

        document.addEventListener("mouseup", this.handleModal);
    }

    handleModal(event: MouseEvent) {
        // console.log(event);
        event.preventDefault();
        const target = event.target as HTMLElement;
        const className = target.getAttribute("class");
        if (className === "chat-profile__settings-icon") {
            //@ts-expect-error window problem            
            window.store.setState({ modalOpened: true });
        } else {
            setTimeout(() => {
                //@ts-expect-error window problem   
                window.store.setState({ modalOpened: false });
            }, 100)
        }

    }

    private handleActiveChat(chat: ChatType) {

        if (!chat.avatar) {
            return;
        }
        const image = document.querySelector(".chat-profile__user-image") as HTMLImageElement;
        const link = `${BASE_URL}/resources` + chat.avatar;
        image.src = link;
    }

    componentDidUpdate(): boolean | void {
        const propsClone = this.props as { activeChat: ChatType, modalOpened: boolean };
        this.handleActiveChat(propsClone.activeChat);
        return true;
    }
    


    render() {
        return (
            `
                    <nav class="chat-profile">
                        <div class="chat-profile__user">
                            {{{ Profile }}}
                            <p class="chat-profile__user-name">{{ activeChat.title }}</p>
                        </div>
                        <div class="chat-profile__settings-button" page="{{ login }}">
                            {{{ Button }}}
                            {{#if modalOpened}}
                                {{{ Modal }}}
                            {{/if}}
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

// return {
//     activeChat: props.activeChat,
//     modalOpened: props.modalOpened,
//     title: props.activeChat.title
// }

export default connect(mapStateToPropsShort)(ChatProfile);
