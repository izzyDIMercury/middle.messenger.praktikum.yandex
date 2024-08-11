import Block from "../../core/block.ts";
import type { StoreType } from "../../types.ts";
import { connect } from "../../core/connect.ts";
import Image from "../image/image.ts";
import Chat from "../../controllers/chat.ts";
import FileSelector from "./file-selector.ts";
import { Search } from "../search/search.ts";

type ChatSettingsProps = {};
type UsersListProps = {};
type UsersProps = {};
type DeleteButtonProps = {};

class ChatSettings extends Block<ChatSettingsProps> {
    constructor(props: ChatSettingsProps) {
        super({
            ...props
        });
    }

    init() {
        const handleFileBind = this.handleFile.bind(this);
        const ChatImage = new Image({
            className: "chat-settings__chat-image",
            src: "/assets/profile-placeholder-small.png",
            alt: "Аватар пользователся",
            page: "chat"
        })
        const File = new FileSelector({
            events: {
                submit: handleFileBind
            }
        });
        const Find = new Search({});
        const Users = new UsersList({});
        this.children = {
            ChatImage,
            File,
            Users,
            Find
        }
    }

    handleFile(event: SubmitEvent) {
        event.preventDefault();
        const target = event.target as unknown as HTMLFormElement;
        const form = new FormData(target);
        const controller = new Chat();
        controller.uploadChatAvatar(form);
    }

    showUsers() {
        const props = this.props as { activeChat: { users: [] }}
        const users = props.activeChat.users;

        // console.log("UPDATE: ", props.activeChat.users);

        if (users && users.length !== 0) {
            const elements = users.map((user) => {
                return new User({
                    first_name: user.first_name,
                    second_name: user.second_name,
                    login: user.login,
                    userId: user.id
                })
            })
            const container = document.querySelector(".chat-settings__users-list-container") as HTMLElement;
            container.textContent = "";
            elements.forEach(el => {
                container?.appendChild(el.getContent());
            })
        }
        // console.log(users);
    }

    componentDidUpdate(): boolean | void {
        const props = this.props as { activeChat: { avatar: string }}
        const image = document.querySelector(".chat-settings__chat-image") as HTMLImageElement;
        image.src = "https://ya-praktikum.tech/api/v2/resources" + props.activeChat.avatar;


        // setTimeout(() => {
        //     console.log("UPDATE: ", this.props.activeChatUsers);
        // }, 3000)

        this.showUsers();
        return true;
    }

    render() {
        return (
            `
                <div class="chat-settings-container">
                    <div class="chat-settings">
                        <div class="chat-settings__image-container">
                            {{{ ChatImage }}}
                        </div>
                        {{{ File }}}
                            <div class="chat-settings__add-container">
                            <p class="chat-settings__add-title">Добавить пользователя:</p>
                            {{{ Find }}}
                            </div>
                        {{{ Users }}}
                    </div>
                </div>
            `
        )
    }
}

class UsersList extends Block<UsersListProps> {
    constructor(props: UsersListProps) {
        super({
            ...props
        })
    }
    render() {
        return (
            `
                <div class="chat-settings__users-list">
                    <p class="chat-settings__users-list-title">Пользователи чата:</p>
                    <ul class="chat-settings__users-list-container"></ul>
                </div>
            `
        )
    }
}

class User extends Block<UsersProps> {
    constructor(props: UsersProps) {
        super({
            ...props
        })
    }

    init() {
        const props = this.props as { userId: number };
        const deleteUserBind = this.deleteUser.bind(this);
        const Button = new DeleteButton({
            userId: props.userId,
            events: {
                click: deleteUserBind
            }
        });
        this.children = {
            Button
        }
    }

    deleteUser(event: MouseEvent) {
        event.preventDefault();
        const target = event.target as HTMLElement;
        const userId = target.getAttribute("userId") as string;
        const controller = new Chat();
        controller.deleteUserFromChat(Number(userId));
    }

    render() {
        return (
            `
                <li class="chat-settings__users-list-user">
                    <p class="chat-settings__users-name">{{ first_name }} {{ second_name }}</p>
                    {{{ Button }}}
                </li>

            `
        )
    }
}

class DeleteButton extends Block<DeleteButtonProps> {
    constructor(props: DeleteButtonProps) {
        super({
            ...props
        })
    }
    render() {
        return (
            `
                <button class="chat-settings__delete-user-button" userId="{{ userId }}">Удалить</button>

            `
        )
    }
}

const mapStateToPropsShort = (props: StoreType): object => {
    return {
        activeChat: props.activeChat
        
    }
}

// // avatar: props.userInfo.avatar,

export default connect(mapStateToPropsShort)(ChatSettings);
