import Block from "../../core/block.ts";
import ProfileButton from "../../components/profile-button/profile-button.ts";
import Search from "../../components/search/search.ts";
import User from "../../components/user/user.ts";
import ChatProfile from "../../components/chat-profile/chat-profile.ts";
import MessagePanel from "../../components/message-panel/message-panel.ts";


export default class ChatPage extends Block {

    constructor(props) {
        super("form", {
            ...props
        })
    }

    init() {
        const MenuButton = new ProfileButton();
        const MenuSearch = new Search();
        const ChatUsers = new Users({
            users: [
                {
                    name: "Илья", 
                    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
                    unread: "2", 
                    image: "/assets/cat.jpg", 
                    time: "10:49",
                    selected: ""
                },
                {
                    name: "Петр", 
                    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
                    unread: "", 
                    image: "/assets/icons/profile-placeholder.png", 
                    time: "Пн",
                    selected: "selected"
                },
                {
                    name: "Пользователь", 
                    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
                    unread: "", 
                    image: "/assets/icons/profile-placeholder.png", 
                    time: "Пн",
                    selected: ""
                }
            ]
        });
        const Profile = new ChatProfile();
        const MessageBlock = new MessagePanel();

        this.children = {
            MenuButton,
            MenuSearch,
            ChatUsers,
            Profile,
            MessageBlock
        }
    }


    render() {
        return (
                `
                    <main class="chat-page">
                        <div class="left-column chat-page__left-column">
                            <nav class="left-column__header">
                                <div class="left-column__header-content">
                                    {{{ MenuButton }}}
                                    {{{ MenuSearch }}}
                                </div>
                            </nav>
                            {{{ ChatUsers }}}
                        </div>
                        <div class="middle-column chat-page__middle-column">
                            {{{ Profile }}}
                            {{{ MessageBlock }}}
                        </div>  
                    </main>
                `
        )
    }
}

class Users extends Block {
    constructor(props) {
        const users = props.users.reduce((acc, current) => {
            const user = new User({name: current.name, message: current.message, unread: current.unread, image: current.image, time: current.time, selected: current.selected});
            acc[user.id] = user;
            return acc;
        }, {});

        super("form", {
            ...props,
            usersKeys: Object.keys(users),
            ...users
        })
        console.log(users)
    }

    render() {
        return (
                `
                    <ul class="left-column__users">
                        ${this.props.usersKeys.map((key) => `{{{ ${key} }}}`).join('')}
                    </ul>
                `
        )
    }
}
