import Block from "../../core/block.ts";
import type { StoreType } from "../../types.ts";
import { connect } from "../../core/connect.ts";
import Image from "../image/image.ts";
import Chat from "../../controllers/chat.ts";
import FileSelector from "./file-selector.ts";

type ChatSettingsProps = {};
// type ChatButtonProps = {};

class ChatSettings extends Block<ChatSettingsProps> {
    constructor(props: ChatSettingsProps) {
        super({
            ...props
        });
    }

    init() {
        const handleFileBind = this.handleFile.bind(this);
        const ChatImage = new Image({
            className: "chat-settings__chat-image",
            src: "/assets/profile-placeholder-small.png",
            alt: "Аватар пользователся",
            page: "chat"
        })
        const File = new FileSelector({
            events: {
                submit: handleFileBind
            }
        });
        this.children = {
            ChatImage,
            File
        }
    }

    handleFile(event: SubmitEvent) {
        event.preventDefault();
        const target = event.target as unknown as HTMLFormElement;
        const form = new FormData(target);
        const controller = new Chat();
        controller.uploadChatAvatar(form);
    }

    componentDidUpdate(): boolean | void {
        const props = this.props as { activeChat: { avatar: string }}
        const image = document.querySelector(".chat-settings__chat-image") as HTMLImageElement;
        image.src = "https://ya-praktikum.tech/api/v2/resources" + props.activeChat.avatar;
    }

    render() {
        return (
            `
                <div class="chat-settings-container">
                    <div class="chat-settings">
                        <div class="chat-settings__image-container">
                            {{{ ChatImage }}}
                            {{{ File }}}
                        </div>
                    </div>
                </div>
            `
        )
    }
}

// class ChatButton extends Block<ChatButtonProps> {
//     constructor(props: ChatButtonProps) {
//         super({
//             ...props
//         })
//     }
//     render() {
//         return (
//             `
//                 <button class="chat-settings__button">Изменить картинку чата</button>
//             `
//         )
//     }
// }

const mapStateToPropsShort = (props: StoreType): object => {
    return {
        activeChat: props.activeChat
        
    }
}

// // avatar: props.userInfo.avatar,

export default connect(mapStateToPropsShort)(ChatSettings);
