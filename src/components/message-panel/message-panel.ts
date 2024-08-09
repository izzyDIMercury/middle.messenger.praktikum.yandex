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
        this.handleMyMessage(input);
        

        // new FormSubmit("message-panel", "", true, event.type);
    }

    public async handleMyMessage(input: string) {
        const controller = new Chat();
        const response = await controller.getUserInfo();
        const userId = JSON.parse(response.response).id;
        this.saveMessage(input, userId)
    }

    public saveMessage(message: string, userId: number) {
        const props = this.props as { messagesCount: number };
        const count = ++props.messagesCount;
        const componentProps = this.props as { chat: {id: "number"}}
        const communication = GlobalStore.getState().communication;
        const id = componentProps.chat.id as unknown as number;
        
        const messages = communication[id] ? communication[id] : [];
        messages.push({
            userId: userId,
            content: message
        });
        communication[id] = messages;
        GlobalStore.setState({ communication, messagesCount: count })
        // console.log(communication);
    }

    componentDidMount(): void {
        
    }

    componentDidUpdate() {
        const controller = new Chat();
        const propsMessage = this.props as PropsMessage;
        if (propsMessage.chat && this.socket === null) {
            const response = controller.connectSocket(propsMessage.chat.id);
            response.then((socket: WSTransport) => {
                this.socket = socket;
                socket.on("Message", (args: SocketProps) => {
                    GlobalStore.setState({ currentMessage: args.content });
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
        isActive: props.activeChat.isActive,
        chat: props.activeChat.chat,
        communication: props.communication,
        chatId: props.activeChat.chat.id,
        messagesCount: props.messagesCount
    }
}

export default connect(mapStateToPropsShort)(MessagePanel);
