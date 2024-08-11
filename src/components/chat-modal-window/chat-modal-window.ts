import Block from "../../core/block.ts";
import Chat from "../../controllers/chat.ts";

type ChatModalWindowProps = {};
type DeleteChatProps = {};
type OpenChatSettingsProps = {};

export default class ChatModalWindow extends Block<ChatModalWindowProps> {
    constructor(props: ChatModalWindowProps) {
        super({
            ...props
        });
    }

    init() {
        const openSettingsBind = this.openSettings.bind(this);
        const deleteChatBind = this.deleteChat.bind(this);
        const DeleteButton = new DeleteChat({
            event: {
                mousedown: deleteChatBind
            }
        });
        const SettingsButton = new OpenChatSettings({
            event: {
                mousedown: openSettingsBind
            }
        })
        this.children = {
            DeleteButton,
            SettingsButton
        }
    }

    openSettings() {

    }

    deleteChat() {
        const chatProps = this.props as { activeChat: { id: number }};
        const chatId = chatProps.activeChat.id;
        const controller = new Chat();
        controller.deleteChat(chatId);
    }

    render() {
        return (
            `
                <div class="modal-window">
                    {{{ DeleteButton }}}
                    {{{ SettingsButton }}}
                </div>
            `
        )
    }
}

class DeleteChat extends Block<DeleteChatProps> {
    constructor(props: DeleteChatProps) {
        super({
            ...props
        });
    }

    render() {
        return (
            `
                <button class="modal-window__delete-button">
                    Удалить чат
                </button>
            `
        )
    }
}
class OpenChatSettings extends Block<OpenChatSettingsProps> {
    constructor(props: OpenChatSettingsProps) {
        super({
            ...props
        });
    }

    render() {
        return (
            `
                <button class="modal-window__setting-button">
                    Настройки чата
                </button>
            `
        )
    }
}
