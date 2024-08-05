import Block from "../../core/block.ts";
import { connect } from "../../core/connect.ts";
import Message from "./message.ts";
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

    init() {
        const props = this.props as MessagesType
        const NewMessage = new Message({
            currentMessage: props.currentMessage
        })

        this.children = {
            NewMessage
        }
    }

    componentDidUpdate() {
        // const container = document.querySelector(".message-text");
        // console.log(container, this.props.currentMessage);
        // container.textContent = this.props.currentMessage;
    }

    render() {
        console.log("rendered");
        // console.log(this.props);
        // setTimeout(() => {
        //     console.log(this.props);
        // }, 5000)
        return (
            `
                <div class="message-window">
                    {{{ NewMessage }}}
                </div>
            `
        )
    }
}


const mapStateToPropsShort = (props: StoreType): object => {
    return {
        currentMessage: props.currentMessage
    }
}

export default connect(mapStateToPropsShort)(Messages);
