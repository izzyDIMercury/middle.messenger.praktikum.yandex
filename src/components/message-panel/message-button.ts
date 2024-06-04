import Block from "../../core/block.ts";
import Image from "../image/image.ts";

type MessageButtonProps = {
    events: {
        click: Function
    }
}

export default class MessageButton extends Block<MessageButtonProps> {

    constructor(props: MessageButtonProps) {
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
