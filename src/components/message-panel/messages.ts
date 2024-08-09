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
        // const props = this.props as MessagesType
        // const NewMessage = new Message({
        //     currentMessage: props.currentMessage
        // })

        // this.children = {
        //     NewMessage
        // }
    }

    componentDidUpdate(): void {
        this.drawMessages();
    }

    drawMessages() {
        const props = this.props as StoreType;
        const chatId = props.chatId;
        const communication = props.communication;

        if (chatId && communication[chatId] && communication[chatId].length !== 0) {
            
            const messages = communication[chatId].map((message: object) => {
                return {
                    node: new Message({}),
                    message: message.content,
                    userId: message.userId
                }
            })
            const container = document.querySelector(".message-window") as HTMLElement;
            container.textContent = "";
            messages.forEach((el) => {
                const node = el.node;
                const element = node.getContent();
                element.setAttribute("userId", el.userId);
                const child = element.firstElementChild;
                child.textContent = el.message;
                // console.log(node);
                container?.appendChild(element);
            })
        }
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
        currentMessage: props.currentMessage,
        communication: props.communication,
        chatId: props.activeChat.chat.id,
        messagesCount: props.messagesCount
    }
}

export default connect(mapStateToPropsShort)(Messages);
