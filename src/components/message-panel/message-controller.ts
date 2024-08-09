import { GlobalStore } from "../../store";
import Message from "./message.ts";
import Chat from "../../controllers/chat.ts";
// import type { StoreType } from "../../types.ts";

export default class MessageController {

    public async handleMessage(input: string, id: number) {
        const controller = new Chat();
        const response = await controller.getUserInfo();
        const userId = JSON.parse(response.response).id;
        const myMessage: boolean = userId === id;
        this.saveMessage(input, id, myMessage)
    }

    public saveMessage(message: string, userId: number, myMessage: boolean) {
        const props = GlobalStore.getState();
        const count = ++props.messagesCount;
        // const componentProps = this.props as { chat: {id: "number"}}
        const communication = props.communication;
        const id = props.activeChat.chat.id as unknown as number;
        
        const messages = communication[id] ? communication[id] : [];
        messages.push({
            userId: userId,
            content: message,
            myMessage: myMessage
        });
        communication[id] = messages;
        GlobalStore.setState({ communication, messagesCount: count })

        const controller = new MessageController();
        controller.drawMessages();
    }

    drawMessages() {
        const props = GlobalStore.getState();
        const chatId = props.activeChat.chat.id;
        const communication = props.communication;

        if (chatId && communication[chatId] && communication[chatId].length !== 0) {
            
            const messages = communication[chatId].map((message: object) => {
                return {
                    node: new Message({}),
                    message: message.content,
                    userId: message.userId,
                    myMessage: message.myMessage
                }
            })
            const container = document.querySelector(".message-window") as HTMLElement;
            container.textContent = "";
            messages.forEach((el) => {
                const node = el.node;
                const element = node.getContent();
                const child = element.firstElementChild;
                // child.setAttribute("userId", el.userId);
                if (el.myMessage) {
                    child.style.backgroundColor = "rgb(198,234,178)";
                    child.style.float = "right";
                }
                child.textContent = el.message;
                container?.appendChild(element);
            })
            const inputElement = document.querySelector("#message") as HTMLInputElement;
            inputElement.value = "";
        }
    }
}
