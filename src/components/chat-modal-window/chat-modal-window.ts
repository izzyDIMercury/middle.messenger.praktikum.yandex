import Block from "../../core/block.ts";

type ChatModalWindowProps = {};

export default class ChatModalWindow extends Block<ChatModalWindowProps> {
    constructor(props: ChatModalWindowProps) {
        super({
            ...props
        });
    }

    render() {
        return (
            `
                <div class="modal-window">
                </div>
            `
        )
    }
}
