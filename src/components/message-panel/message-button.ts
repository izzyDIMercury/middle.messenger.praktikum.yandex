import Block from "../../core/block.ts";
import Image from "../image/image.ts";
import { Props } from "../../types.ts";

export default class MessageButton extends Block {

    constructor(props: Props) {
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
