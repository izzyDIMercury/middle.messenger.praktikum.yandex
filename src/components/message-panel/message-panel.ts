import Block from "../../core/block.ts";
import Input from "../input/input.ts";
import Image from "../image/image.ts";
import MessageButton from "./message-button.ts";
import FormSubmit from "../../core/formSubmit.ts";

type MessagePanelProps = {};

export default class MessagePanel extends Block<MessagePanelProps> {
    constructor(props: MessagePanelProps) {
        super({
            props
        });
    }

    init() {
        const handleBlurBind = this.handleBlur.bind(this);
        const handleSubmitBind = this.handleSubmit.bind(this);

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
        const Send = new MessageButton({
            events: {
                click: handleSubmitBind
            }
        });

        this.children = {
            MessageInput,
            ClipIcon,
            Send
        };
    }

    handleBlur(event: FocusEvent): void {
        this.handleSubmit(event);
    }

    handleSubmit(event: FocusEvent | MouseEvent): void {
        event.preventDefault();

        new FormSubmit("message-panel", "", "", true, event.type);
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
