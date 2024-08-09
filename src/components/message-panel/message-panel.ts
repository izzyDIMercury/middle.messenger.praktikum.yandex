import Block from "../../core/block.ts";
import Input from "../input/input.ts";
import Image from "../image/image.ts";
import MessageButton from "./message-button.ts";
import Chat from "../../controllers/chat.ts";
// import FormSubmit from "../../core/formSubmit.ts";
import { connect } from "../../core/connect.ts";
import WSTransport from "../../core/WSTransport.ts";
import Messages from "./messages.ts";
import type { StoreType } from "../../types.ts";
import { GlobalStore } from "../../store.ts";
import MessageController from "./message-controller.ts";

type MessagePanelProps = {};

type PropsMessage = {
    chat: {
        id: number
    }
}

type SocketProps = {
    content: "string"
}

class MessagePanel extends Block<MessagePanelProps> {

    public socket: WSTransport | null = null;

    constructor(props: MessagePanelProps) {
        super({
            props
        });
    }

    init() {
        const handleSubmitBind = this.handleSubmit.bind(this);
        const propsMessage = this.props as Partial<StoreType>;

        const Form = new MessageForm({
            events: {
                submit: handleSubmitBind
            }
        })
        const MessageWindow = new Messages({
            currentMessage: propsMessage.currentMessage
        });

        this.children = {
            MessageWindow,
            Form
        };
    }

    public handleSubmit(event: FocusEvent | MouseEvent): void {
        event.preventDefault();
        const messageElement = document.querySelector("#message") as HTMLInputElement;
        const input = messageElement.value;
        this.socket && this.socket.send({
            content: input,
            type: "message"
        });
    }

    componentDidUpdate() {
        const messageController = new MessageController();
        const controller = new Chat();
        const propsMessage = this.props as PropsMessage;
        if (propsMessage.chat && this.socket === null) {
            const response = controller.connectSocket(propsMessage.chat.id);
            response.then((socket: WSTransport) => {
                this.socket = socket;
                socket.on("Message", (args: SocketProps) => {
                    GlobalStore.setState({ currentMessage: args.content });
                    messageController.handleMessage(args.content, args.user_id);
                })
            })
        }
    }

    render() {
        return (
            `
                    <div class="message-panel-container">
                        {{{ MessageWindow }}}
                        {{{ Form }}}
                    </div>
                `
        );
    }
}

type MessageFormProps = {};

class MessageForm extends Block<MessageFormProps> {
    constructor(props: MessageFormProps) {
        super({
            ...props
        })
    }

    init() {
        const handleBlurBind = this.handleBlur.bind(this);

        const MessageInput = new Input({
            className: "message-panel__input",
            type: "text",
            name: "message",
            title: "message",
            label: "message",
            enabled: true,
            blur: handleBlurBind
        });
        const ClipIcon = new Image({
            className: "message-panel__attach-icon",
            src: "/assets/icons/clip.png",
            alt: "Прикрепить",
            path: ""
        });
        const Send = new MessageButton({});

        this.children = {
            MessageInput,
            ClipIcon,
            Send
        };
    }

    handleBlur(event: FocusEvent): void {
        // this.handleSubmit(event);
        // console.log(event);
    }


    render() {
        return (
            `
                    <form class="message-panel">
                        <div class="message-panel__attach-button">
                            {{{ ClipIcon }}}
                        </div>
                        <div class="message-panel__message">
                            {{{ MessageInput }}}
                        </div>
                        {{{ Send }}}
                    </form>
                `
        );
    }
}

const mapStateToPropsShort = (props: StoreType): object => {
    return {
        chat: props.activeChat.chat,
        communication: props.communication,
        chatId: props.activeChat.chat.id
    }
}

// isActive: props.activeChat.isActive,
//         chat: props.activeChat.chat,
//         communication: props.communication,
//         chatId: props.activeChat.chat.id,
//         messagesCount: props.messagesCount

export default connect(mapStateToPropsShort)(MessagePanel);
