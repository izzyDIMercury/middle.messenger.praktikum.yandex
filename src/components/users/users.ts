import Block from "../../core/block.ts";
import User from "../user/user.ts";

export default class Users extends Block {
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
