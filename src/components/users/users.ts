import Block from "../../core/block.ts";
import User from "../user/user.ts";
import Chat from "../../controllers/chat.ts";
import { connect } from "../../core/connect.ts";
import type { StoreType } from "../../types.ts";
import { BASE_URL } from "../../constants.ts";


type UserType = {};

type CurrentType = {
    [key: string]: {
        [key: string]: {}
    }
}

type ChatObject = {
    id: number,
    title: string,
    avatar: string,
    lastMessage: LastMessage
}

type LastMessage = { content: string } | null;

type ObjectsList = ChatObject[]

class Users extends Block<UserType> {

    constructor(props: UserType) {
        super({
            ...props
        });
    }

    public toggleActiveChat(event: MouseEvent) {
        const targetElement = event.target as HTMLElement;
        const parentElement = targetElement.closest("li") as HTMLElement;
        this.handleSelectColor(parentElement);

        const chatId = parentElement.getAttribute("chatid") as string;
        const props = this.props as CurrentType;
        const activeChat =  props.chats[chatId];
        //@ts-expect-error can't properly type window.store
        window.store.setState({
            activeChat: {
                ...activeChat,
                isActive: true
            },
            activeChatId: chatId
        })
        const messagesContainer = document.querySelector(".message-window") as HTMLElement;
        messagesContainer.textContent = "";
    }

    public handleSelectColor(element: HTMLElement) {
        const container = element.closest("ul") as HTMLElement;
        const children = container.childNodes;
        children.forEach((child: any) => {
            child.style.backgroundColor = "rgba(255, 255, 255, 0)";
        })
        element.style.backgroundColor = "rgba(171, 77, 204, 0.3)";
    }

    private handleLastMessage(lastMessage: LastMessage) {
        const content = lastMessage ? lastMessage.content : "";
        if (content.length > 25) {
            const array: string[] = content.split("");
            const newArray: string[] = [];
            for (let i = 0; i < 25; i++) {
                newArray.push(array[i]);
            }
            newArray.push("...");
            const message: string = newArray.join("");
            return message; 
        }
        return content;
    }


    componentDidMount() {
        const controller = new Chat();
        controller.getChats();
    }

    componentDidUpdate() {
        const toggleActiveChatBind = this.toggleActiveChat.bind(this);
        const props = this.props as CurrentType;

        if (Object.keys(props.chats).length !== 0) {
            const chats = Object.values(props.chats) as ObjectsList;
            const elements = chats.map((chat: ChatObject) => {
                const lastMessage = this.handleLastMessage(chat.lastMessage);
                const avatar = chat.avatar ? `${BASE_URL}/resources` + chat.avatar : undefined;
                return new User({
                    title: chat.title,
                    chatId: chat.id,
                    avatar: avatar,
                    lastMessage: lastMessage,
                    events: {
                        click: toggleActiveChatBind
                    }
                })
            })
            const root = document.querySelector(".left-column__users") as HTMLElement;
            root.textContent = "";
            let counter: number = 0;
            elements.forEach(el => {
                if (counter < 10) {
                    counter++;
                    root?.appendChild(el.getContent());
                }
            })
        }
    }

    render() {
        return (
            `
                    <ul class="left-column__users">
                    </ul>
                `
        );
    }
}

const mapStateToPropsShort = (props: StoreType): object => {
    return {
        chats: props.chats
    }
}

// length: props.length

export default connect(mapStateToPropsShort)(Users);


