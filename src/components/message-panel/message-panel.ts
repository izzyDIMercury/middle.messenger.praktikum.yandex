import Block from "../../core/block.ts";
import Input from "../input/input.ts";
import Image from "../image/image.ts";


export default class MessagePanel extends Block {

    constructor(props) {
        super("form", {
            ...props
        })
    }

    init() {
        const MessageInput = new Input({
            className: "message-panel__input",
            type: "text",
            name: "message",
            title: "message",
            value: "Сообщение"
        })
        const ClipIcon = new Image({
            className: "message-panel__attach-icon",
            src: "/assets/icons/clip.png",
            alt: "Прикрепить"
        })

        this.children = {
            MessageInput,
            ClipIcon
        }
    }


    render() {
        return (
                `
                    <div class="message-panel">
                        <div class="message-panel__attach-button">
                            {{{ ClipIcon }}}
                        </div>
                        <form class="message-panel__message">
                            {{{ MessageInput }}}
                        </form>
                    </div>
                `
        )
    }
}
