import Block from "../../core/block.ts";
import ProfileButton from "../../components/profile-button/profile-button.ts";
import Search from "../../components/search/search.ts";
import Users from "../../components/users/users.ts";
import ChatProfile from "../../components/chat-profile/chat-profile.ts";
import MessagePanel from "../../components/message-panel/message-panel.ts";
import { switchPage } from "../../core/utils.ts";

type ChatPageProps = {};

export default class ChatPage extends Block<ChatPageProps> {
    constructor(props: ChatPageProps) {
        super("form", {
            ...props,
        });

        console.log(props);
    }

    init() {
        const MenuButton = new ProfileButton({
            events: {
                click: switchPage,
            },
        });
        const MenuSearch = new Search({});
        const ChatUsers = new Users({
            usersKeys: [],
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
                },
            ],
        });
        const Profile = new ChatProfile({});
        const MessageBlock = new MessagePanel({});

        this.children = {
            MenuButton,
            MenuSearch,
            ChatUsers,
            Profile,
            MessageBlock,
        };
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
        );
    }
}
