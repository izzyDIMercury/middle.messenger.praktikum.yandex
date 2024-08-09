import Block from "../../core/block.ts";
import { connect } from "../../core/connect.ts";
import type { StoreType } from "../../types.ts";

type MessagesType = {
    currentMessage: string
};

class Messages extends Block<MessagesType> {

    constructor(props: MessagesType) {
        super({
            ...props
        });
    }

    render() {
        return (
            `
                <div class="message-window">
                    
                </div>
            `
        )
    }
}


const mapStateToPropsShort = (props: StoreType): object => {
    return {
        messagesCount: props.messagesCount
    }
}

export default connect(mapStateToPropsShort)(Messages);
