import Block from "../../core/block.ts";
import User from "../user/user.ts";
import Chat from "../../controllers/chat.ts";
import { connect } from "../../core/connect.ts";
import { GlobalStore } from "../../store.ts";
import type { StoreType } from "../../types.ts";


type UserType = {};

type CurrentType = {
    [key: string]: {
        [key: string]: {}
    }
}

type ChatObject = {
    chat: {
        id: number
    },
    user: {
        first_name: string,
        second_name: string,
        avatar: string
    }
}

type ObjectsList = ChatObject[]

class Users extends Block<UserType> {

    private firstUserSelected: boolean = false;

    constructor(props: UserType) {
        super({
            ...props
        });
    }

    // init() {
    //     const interval = setInterval(() => {
    //         const container = document.querySelector(".left-column__users");
    //         const child = container?.firstChild;
    //         if (child instanceof HTMLElement) {
    //             child.click();
    //             clearInterval(interval);
    //         }
    //     }, 50);

    //     setTimeout(() => {
    //         clearInterval(interval);
    //     }, 5000)
    // }

    public toggleActiveChat(event: MouseEvent) {
        const targetElement = event.target as HTMLElement;
        const parentElement = targetElement.closest("li") as HTMLElement;
        this.handleSelectColor(parentElement);

        const chatId = parentElement.getAttribute("chatid") as string;
        const props = this.props as CurrentType;
        const activeChat =  props.chats[chatId];
        GlobalStore.setState({
            activeChat: {
                ...activeChat,
                isActive: true
            }
        })
        
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
            const elements = chats.map(({chat, user}) => {
                const avatar = "https://ya-praktikum.tech/api/v2/resources" + user.avatar;
                return new User({
                    first_name: user.first_name,
                    second_name: user.second_name,
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
        chats: props.chats,
        length: props.length
    }
}

export default connect(mapStateToPropsShort)(Users);

