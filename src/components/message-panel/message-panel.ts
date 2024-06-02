import Block from "../../core/block.ts";
import Input from "../input/input.ts";
import Image from "../image/image.ts";
import { checkForErrors } from "../../core/utils.ts";


export default class MessagePanel extends Block {

    constructor(props) {
        super("form", {
            ...props
        })
    }

    init() {
        const handleBlurBind = this.handleBlur.bind(this);
        const handleSubmitBind = this.handleSubmit.bind(this);

        const MessageInput = new Input({
            className: "message-panel__input",
            type: "text",
            name: "message",
            title: "message",
            value: "Сообщение",
            onBlur: handleBlurBind
        })
        const ClipIcon = new Image({
            className: "message-panel__attach-icon",
            src: "/assets/icons/clip.png",
            alt: "Прикрепить"
        })
        const Send = new SendButton({
            events: {
                click: handleSubmitBind
            }
        })

        this.children = {
            MessageInput,
            ClipIcon,
            Send
        }
    }

    handleBlur(e) {
        this.handleSubmit(e);
    }

    handleSubmit(e) {
        e.preventDefault();
        const result = checkForErrors(".message-panel", "input");
        if (result.hasErrors) {
            alert("Сообщение не должно быть пустым.");
        } else {
            alert("Сообщение отправлено.");
        }
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
        )
    }
}

class SendButton extends Block {

    constructor(props) {
        super("form", {
            ...props
        })
    }

    init() {
        const SendIcon = new Image({
            className: "message-panel__send-icon",
            src: "/assets/icons/arrow-right.png",
            alt: "Отправить"
        })

        this.children = {
            SendIcon
        }
    }

    render() {
        return (
            `
                <button class="message-panel__send-button" type="submit">
                    {{{ SendIcon }}}
                </button>
            `
        )
    }
}
