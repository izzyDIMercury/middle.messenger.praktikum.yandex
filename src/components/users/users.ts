import Block from "../../core/block.ts";
import User from "../user/user.ts";

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

export default class Users extends Block<UsersArray> {
    constructor(props: UsersArray) {
        const users = props.users.reduce((acc: { [key: string]: InstanceType<typeof Block> }, current) => {
            const user = new User({
                name: current.name, message: current.message, unread: current.unread, image: current.image, time: current.time, selected: current.selected,
            });
            acc[user.id] = user;
            return acc;
        }, {});

        super("form", {
            ...props,
            usersKeys: Object.keys(users),
            ...users,
        });
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
