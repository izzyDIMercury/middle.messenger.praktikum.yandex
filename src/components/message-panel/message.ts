import Block from "../../core/block.ts";
import { connect } from "../../core/connect.ts";
import type { StoreType } from "../../types.ts";

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

// const mapStateToPropsShort = (props: StoreType): object => {
//     return {
//         messagesCount: props.messagesCount
//     }
// }

// currentMessage: props.currentMessage,
//         communication: props.communication,
//         chatId: props.activeChat.chat.id,

// export default connect(mapStateToPropsShort)(Message);
