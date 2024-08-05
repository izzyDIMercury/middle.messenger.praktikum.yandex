import Block from "../../core/block.ts";
import User from "../user/user.ts";
import Chat from "../../controllers/chat.ts";
import { connect } from "../../core/connect.ts";

// type UserData = {
//     image: string,
//     message: string,
//     name: string,
//     selected: string,
//     unread: string,
//     time: string
// }

// type UsersArray = { 
//     users: Array<UserData>,
//     usersKeys: string[]
// }

type UserType = {};

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

        const chatId = parentElement.getAttribute("chatid");
        const activeChat =  this.props.chats[chatId];
        window.store.setState({
            activeChat: activeChat,
            isActive: true
        })
        
    }

    public handleSelectColor(element: HTMLElement) {
        const container = element.closest("ul") as HTMLElement;
        const children = container.childNodes ;
        children.forEach((child: HTMLElement) => {
            child.style.backgroundColor = "rgba(255, 255, 255, 0)";
        })
        element.style.backgroundColor = "rgba(171, 77, 204, 0.3)";
    }

    componentDidMount() {
        const controller = new Chat();
        controller.getChats();
    }

    componentDidUpdate() {
        const toggleActiveChatBind = this.toggleActiveChat.bind(this);
        
        if (Object.keys(this.props.chats).length !== 0) {
            const chats = Object.values(this.props.chats);
            const elements = chats.map(({ chat, user }) => new User({ 
                first_name: user.first_name,
                second_name: user.second_name,
                chatId: chat.id,
                events: {
                    click: toggleActiveChatBind
                }
            }))
            const root = document.querySelector(".left-column__users");
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

const mapStateToPropsShort = ({ chats, length }): object => {
    return { chats, length }
}

// length: Object.keys(chats).length chatListUpdated

export default connect(mapStateToPropsShort)(Users);

