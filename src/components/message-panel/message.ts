import Block from "../../core/block.ts";

type MessageProps = {};

export default class Message extends Block<MessageProps> {
    constructor(props: MessageProps) {
        super({
            props
        });
    }

    render() {
        return (
            `<div class="message">
                <p class="message-text"></p>
            </div>
            `
        )
    }
}
