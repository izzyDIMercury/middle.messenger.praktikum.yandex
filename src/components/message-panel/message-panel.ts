import Block from "../../core/block.ts";
import Input from "../input/input.ts";
import Image from "../image/image.ts";
import MessageButton from "./message-button.ts";
import Chat from "../../controllers/chat.ts";
import FormSubmit from "../../core/formSubmit.ts";
import { connect } from "../../core/connect.ts";
import WSTransport from "../../core/WSTransport.ts";

type MessagePanelProps = {};

class MessagePanel extends Block<MessagePanelProps> {

    public socket: WSTransport | null = null;

    constructor(props: MessagePanelProps) {
        super({
            props
        });
    }

    init() {
        const handleSubmitBind = this.handleSubmit.bind(this);

        const Form = new MessageForm({
            events: {
                submit: handleSubmitBind
            }
        })

        this.children = {
            Form
        };
    }

    public handleSubmit(event: FocusEvent | MouseEvent): void {
        event.preventDefault();
        console.log(event);

        // new FormSubmit("message-panel", "", true, event.type);
    }

    componentDidUpdate() {
        const controller = new Chat();
        if (this.props.chat && this.socket === null) {
            const response = controller.connectSocket(this.props.chat.id);
            response.then((socket: WSTransport) => {
                this.socket = socket;
            })
        }


    }

    render() {
        return (
            `
                    <div class="message-panel-container">
                        {{{ Form }}}
                    </div>
                `
        );
    }
}

class MessageForm extends Block {
    constructor(props) {
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

const mapStateToPropsShort = ({ activeChat }): object => {
    return {
        isActive: activeChat.isActive,
        chat: activeChat.chat
    }
}

export default connect(mapStateToPropsShort)(MessagePanel);
