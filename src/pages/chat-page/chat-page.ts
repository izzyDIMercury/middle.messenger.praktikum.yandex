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
        const ChatUser = new User({
            name: "Илья", 
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
            unread: "2", 
            image: "/assets/cat.jpg", 
            time: "10:49",
            selected: ""
        });
        const Profile = new ChatProfile();
        const MessageBlock = new MessagePanel();

        this.children = {
            MenuButton,
            MenuSearch,
            ChatUser,
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
                            <ul class="left-column__users">
                                {{{ ChatUser }}}
                            </ul>
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
