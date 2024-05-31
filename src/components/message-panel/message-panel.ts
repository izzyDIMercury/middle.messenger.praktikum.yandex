import Block from "../../core/block.ts";
import Input from "../input/input.ts";


export default class MessagePanel extends Block {

    constructor(props) {
        super("form", {
            ...props
        })
    }

    input() {
        const MessageInput = new Input({
            className: "message-panel__input",
            type: "text",
            name: "message",
            title: "message",
            value: "Сообщение"
        })
    }


    render() {
        return (
                `
                    <div class="message-panel">
                        <div class="message-panel__attach-button">
                            <img src="{{ clipIcon }}" alt="Прикрепить" class="message-panel__attach-icon">
                        </div>
                        <form class="message-panel__message">
                            {{{ MessageInput }}}
                        </form>
                    </div>
                `
        )
    }
}
