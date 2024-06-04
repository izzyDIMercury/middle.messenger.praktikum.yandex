import Block from "../../core/block.ts";
import Input from "../input/input.ts";
import Image from "../image/image.ts";
import MessageButton from "./message-button.ts";
import FormSubmit from "../../core/formSubmit.ts";


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
            label: "message",
            enabled: true,
            blur: handleBlurBind
        })
        const ClipIcon = new Image({
            className: "message-panel__attach-icon",
            src: "/assets/icons/clip.png",
            alt: "Прикрепить"
        })
        const Send = new MessageButton({
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

    handleBlur(event) {
        this.handleSubmit(event);
    }

    handleSubmit(event) {
        event.preventDefault();

        const submit = new FormSubmit({
            formClass: "message-panel",
            parentClass: "",
            errorClass: "",
            isMessage: true
        })
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

