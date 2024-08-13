// import { GlobalStore } from "../../store";
import Message from "./message.ts";
import Chat from "../../controllers/chat.ts";
import type { UserMessage } from "../../types.ts";

type MessageType = {
    content: string,
    userId: number,
    myMessage: boolean
}

type Node = {
    getContent: Function
}

type Element = {
    node: Node,
    message: string,
    userId: number,
    myMessage: boolean

}

type User = {
    id: number
}

export default class MessageController {


    public async handleMessages(messages: UserMessage[]) {
        const controller = new Chat();
        const response = await controller.getUserInfo();
        const myId = JSON.parse(response.response).id;
        let lastMessages: UserMessage[] = messages;
        if (messages.length > 30) {
            const result: UserMessage[] | [] = [];
            for (let i = 0; i < 30; i++) {
                //@ts-expect-error unexpected behavior
                result.push(messages[i]);
            }
            lastMessages = result;
        }
        lastMessages.reverse();
        this.saveMessages(lastMessages, myId)
    }

    public saveMessages(messages: UserMessage[], myId: number) {
        const processedMessages = messages.map((message: UserMessage) => {
            const myMessage: boolean = myId === message.user_id;
            return {
                myMessage,
                userId: message.user_id,
                content: message.content
            }
        })
        //@ts-expect-error can't properly type window.store
        const props = window.store.getState();
        const count = ++props.messagesCount;
        const communication = props.communication;
        const chatId = props.activeChat.id as unknown as number;
        communication[chatId] = processedMessages;
        // console.log(communication)

        //@ts-expect-error can't properly type window.store
        window.store.setState({ communication, messagesCount: count })

        // const controller = new MessageController();
        this.drawMessages();
    }

    public async handleLastMessage(input: string, login: string) {

        const controller = new Chat();
        const response = await controller.searchUsers(login);
        const result = JSON.parse(response.response) as User[];
        if (result.length === 0) {
            //@ts-expect-error can't properly type window.store
            const id = window.store.getState().userInfo.id;
            this.handleMessage(input, id, true);
            return;
        } else {
            this.handleMessage(input, result[0].id, true);
        }
    }


    public async handleMessage(input: string, id: number, isLast: boolean) {
        const controller = new Chat();
        const response = await controller.getUserInfo();
        const userId = JSON.parse(response.response).id;
        const myMessage: boolean = userId === id;
        this.saveMessage(input, id, myMessage, isLast)
    }

    public saveMessage(message: string, userId: number, myMessage: boolean, isLast: boolean) {
        //@ts-expect-error can't properly type window.store
        const props = window.store.getState();
        const count = ++props.messagesCount;
        // const componentProps = this.props as { chat: {id: "number"}}
        const communication = props.communication;
        const id = props.activeChat.id as unknown as number;
        
        const messages = communication[id] ? communication[id] : [];
        if (isLast) {
            messages[0] = {
                userId: userId,
                content: message,
                myMessage: myMessage
            }
        } else {
            messages.push({
                userId: userId,
                content: message,
                myMessage: myMessage
            });
        }
        communication[id] = messages;
        //@ts-expect-error can't properly type window.store
        window.store.setState({ communication, messagesCount: count })

        const controller = new MessageController();
        controller.drawMessages();
    }

    drawMessages() {
        //@ts-expect-error can't properly type window.store
        const props = window.store.getState();
        const chatId = props.activeChat.id;
        const communication = props.communication;

        if (chatId && communication[chatId] && communication[chatId].length !== 0) {
            
            const messages = communication[chatId].map((message: MessageType) => {
                return {
                    node: new Message({}),
                    message: message.content,
                    userId: message.userId,
                    myMessage: message.myMessage
                }
            })
            const container = document.querySelector(".message-window") as HTMLElement;
            container.textContent = "";
            const block = document.createElement("div");
            block.setAttribute("class", "message-block");
            messages.forEach((el: Element) => {
                const node = el.node;
                const element = node.getContent();
                const child = element.firstElementChild;
                if (el.myMessage) {
                    child.style.backgroundColor = "rgb(198,234,178)";
                    child.style.float = "right";
                    child.style.textAlign = "right"
                }
                child.textContent = el.message;
                block?.appendChild(element);
            })
            container?.appendChild(block);
            const inputElement = document.querySelector("#message") as HTMLInputElement;
            inputElement.value = "";

            container.scrollTop = container.scrollHeight;
        }
    }
}
