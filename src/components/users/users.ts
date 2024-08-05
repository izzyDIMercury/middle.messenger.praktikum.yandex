import Block from "../../core/block.ts";
import User from "../user/user.ts";
import Chat from "../../controllers/chat.ts";
import { connect } from "../../core/connect.ts";

type UserData = {
    image: string,
    message: string,
    name: string,
    selected: string,
    unread: string,
    time: string
}

type UsersArray = { 
    users: Array<UserData>,
    usersKeys: string[]
}

class Users extends Block<UsersArray> {
    constructor(props: UsersArray) {
        const users = props.users.reduce((acc: { [key: string]: InstanceType<typeof Block> }, current) => {
            const user = new User({
                name: current.name, message: current.message, unread: current.unread, image: current.image, time: current.time, selected: current.selected
            });
            acc[user.id] = user;
            return acc;
        }, {});

        super({
            ...props,
            usersKeys: Object.keys(users),
            ...users
        });
    }

    componentDidMount(): void {
        async function getChatsInfo() {
            const controller = new Chat();
            const response = controller.getChats();
        }

        getChatsInfo();
    }

    render() {
        const container = this.props as UsersArray;
        return (
            `
                    <ul class="left-column__users">
                        ${container.usersKeys.map((key) => `{{{ ${key} }}}`).join("")}
                    </ul>
                `
        );
    }
}

const mapStateToPropsShort = ({ chats }): object => {
    return { chats }
}

export default connect(mapStateToPropsShort)(Users);
