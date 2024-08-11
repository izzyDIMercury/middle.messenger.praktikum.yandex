import Block from "../../core/block.ts";
import User from "../user/user.ts";
import Chat from "../../controllers/chat.ts";
import { connect } from "../../core/connect.ts";
// import { GlobalStore } from "../../store.ts";
import type { StoreType } from "../../types.ts";


type UserType = {};

type CurrentType = {
    [key: string]: {
        [key: string]: {}
    }
}

type ChatObject = {
    id: number,
    title: string,
    avatar: string
}

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


    componentDidMount() {
        const controller = new Chat();
        controller.getChats();
    }

    componentDidUpdate() {
        console.log("USERS UPDATED");
        const toggleActiveChatBind = this.toggleActiveChat.bind(this);
        const props = this.props as CurrentType;

        if (Object.keys(props.chats).length !== 0) {
            const chats = Object.values(props.chats) as ObjectsList;
            const elements = chats.map((chat: ChatObject) => {
                const avatar = chat.avatar ? "https://ya-praktikum.tech/api/v2/resources" + chat.avatar : undefined;
                return new User({
                    title: chat.title,
                    chatId: chat.id,
                    avatar: avatar,
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

