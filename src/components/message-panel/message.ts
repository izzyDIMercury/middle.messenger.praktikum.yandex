import Block from "../../core/block.ts";
import { connect } from "../../core/connect.ts";
import type { StoreType } from "../../types.ts";

type MessageProps = {};

class Message extends Block<MessageProps> {
    constructor(props: MessageProps) {
        super({
            props
        });
    }

    render() {
        return (
            `<div class="message">
                <p class="message-text">{{ message }}</p>
            </div>
            `
        )
    }
}

const mapStateToPropsShort = (props: StoreType): object => {
    return {
        currentMessage: props.currentMessage,
        communication: props.communication,
        chatId: props.activeChat.chat.id,
        messagesCount: props.messagesCount
    }
}

export default connect(mapStateToPropsShort)(Message);
