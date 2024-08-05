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

    componentDidMount() {
        const controller = new Chat();
        controller.getChats();   
    }

    componentDidUpdate() {
        // console.log("updated users");
        
        if (Object.keys(this.props.chats).length !== 0) {
            const chats = Object.values(this.props.chats);
            console.log(chats);
            const elements = chats.map(({ chat, user }) => new User({ 
                first_name: user.first_name,
                second_name: user.second_name
            }))
            console.log(elements);
            const root = document.querySelector(".left-column__users");
            root.textContent = "";
            let counter: number = 0;
            elements.forEach(el => {
                if (counter < 3) {
                    counter++;
                    root?.appendChild(el.getContent());
                }
            })
        }
    }

    render() {
        console.log(this.props);
        return (
            `
                    <ul class="left-column__users">
                        43
                    </ul>
                `
        );
    }
}

const mapStateToPropsShort = ({ chats, chatListUpdated }): object => {
    return { chats, chatListUpdated }
}

// ${container.usersKeys.map((key) => `{{{ ${key} }}}`).join("")}

export default connect(mapStateToPropsShort)(Users);


// constructor(props: UsersArray) {
//     const users = props.users.reduce((acc: { [key: string]: InstanceType<typeof Block> }, current) => {
//         const user = new User({
//             name: current.name, message: current.message, unread: current.unread, image: current.image, time: current.time, selected: current.selected
//         });
//         acc[user.id] = user;
//         return acc;
//     }, {});

//     super({
//         ...props,
//         usersKeys: Object.keys(users),
//         ...users
//     });
// }
