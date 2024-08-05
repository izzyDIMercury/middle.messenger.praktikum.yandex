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
            `<p class="message-text">{{ currentMessage }}</p>`
        )
    }
}

const mapStateToPropsShort = (props: StoreType): object => {
    return {
        currentMessage: props.currentMessage
    }
}

export default connect(mapStateToPropsShort)(Message);
