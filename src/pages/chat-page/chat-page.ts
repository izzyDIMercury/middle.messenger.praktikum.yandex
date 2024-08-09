import Block from "../../core/block.ts";
import ProfileButton from "../../components/profile-button/profile-button.ts";
import { Search } from "../../components/search/search.ts";
import Users from "../../components/users/users.ts";
import ChatProfile from "../../components/chat-profile/chat-profile.ts";
import MessagePanel from "../../components/message-panel/message-panel.ts";
import { switchPage, fillUserInfo } from "../../core/utils.ts";
import { connect } from "../../core/connect.ts";
import Loading from "../../components/loading/loading.ts";
// import { GlobalStore } from "../../store.ts";
import type { StoreType } from "../../types.ts";
// import Chat from "../../controllers/chat.ts";

type ChatPageProps = {};

class ChatPage extends Block<ChatPageProps> {

    constructor(props: ChatPageProps) {
        super({
            ...props
        });
        fillUserInfo("chat");
    }

    init() {
        // const controller = new Chat();
        // controller.setGlobalUserInfo();

        const MenuButton = new ProfileButton({
            events: {
                click: switchPage
            }
        });
        const MenuSearch = new Search({});
        const ChatUsers = new Users({
            
        });
        const Profile = new ChatProfile({});
        const MessageBlock = new MessagePanel({});

        const LoadingWindow = new Loading("")

        this.children = {
            MenuButton,
            MenuSearch,
            ChatUsers,
            Profile,
            MessageBlock,
            LoadingWindow
        };
    }

    componentDidMount(): void {

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

const mapStateToPropsShort = (props: StoreType): object => {
    return {
        isLoading: props.isLoading
    }
}

export default connect(mapStateToPropsShort)(ChatPage);

