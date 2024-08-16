import Block from "../../core/block.ts";
import ProfileButton from "../../components/profile-button/profile-button.ts";
import { Search } from "../../components/search/search.ts";
import Users from "../../components/users/users.ts";
import ChatProfile from "../../components/chat-profile/chat-profile.ts";
import MessagePanel from "../../components/message-panel/message-panel.ts";
import { switchPage, fillUserInfo } from "../../core/utils.ts";
import { connect } from "../../core/connect.ts";
import Loading from "../../components/loading/loading.ts";
import type { StoreType } from "../../types.ts";
import ChatSettings from "../../components/chat-settings/chat-settings.ts";
import CreateChat from "../../components/create-chat/create-chat.ts";


type ChatPageProps = {};

class ChatPage extends Block<ChatPageProps> {

    constructor(props: ChatPageProps) {
        super({
            ...props
        });
        fillUserInfo("chat");
    }

    init() {
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

        const LoadingWindow = new Loading("");
        const Settings = new ChatSettings({});
        const Create = new CreateChat({});

        this.children = {
            MenuButton,
            MenuSearch,
            ChatUsers,
            Profile,
            MessageBlock,
            LoadingWindow,
            Settings,
            Create
        };
    }

    componentDidUpdate() {
        const container = document.querySelector(".chat-settings-container");
        const props = this.props as { chatSettingsOpened: boolean }
        if (props.chatSettingsOpened) {
            container?.setAttribute("style", "display: flex")
        } else {
            container?.setAttribute("style", "display: none")
        }
    }

    public componentDidMount(): void {
        console.log("MOUNTED");
    }

    // public componentWillUnmount(): void {
    //     console.log("UNMOUNTED");
    //     alert("UNMOUNT");
    // }

    render() {
        return (
            `
                    <main class="chat-page">                        
                        <div class="left-column chat-page__left-column">
                            <nav class="left-column__header">
                                <div class="left-column__header-content">
                                    {{{ MenuButton }}}
                                    {{{ Create }}}
                                </div>
                            </nav>
                            {{{ ChatUsers }}}
                        </div>
                        <div class="middle-column chat-page__middle-column">
                            {{{ Profile }}}
                            {{{ MessageBlock }}}
                        </div>
                        {{{ Settings }}}
                    </main>
                `
        );
    }
}

const mapStateToPropsShort = (props: StoreType): object => {
    return {
        chatSettingsOpened: props.chatSettingsOpened
    }
}

export default connect(mapStateToPropsShort)(ChatPage);

