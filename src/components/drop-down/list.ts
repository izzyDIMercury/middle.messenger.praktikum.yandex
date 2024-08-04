import Block from "../../core/block.ts";
import { connect } from "../../core/connect.ts";
import User from "./item.ts";

class UsersList extends Block {
    constructor(props) {
        // console.log(props);
        // const users = props.users.reduce((acc, current) => {
        //     const user = new User({
        //         name: current.first_name
        //     });
        //     acc[user.id] = user;
        //     return acc;
        // }, {});


        // super({
        //     ...props,
        //     usersKeys: Object.keys(users),
        //     ...users
        // })

        super({ ...props })
    }

    componentDidMount() {
        if (this.props.usersFound) {
            const users = this.props.usersFound.map(element => new User({ name: element.first_name }))
            const root = document.querySelector(".found-users");
            users.forEach(el => {
                root?.appendChild(el.getContent());
            })
            console.log(root);
        }
    }

    render() {
        // console.log("OVER HERE", this.props);
        const container = this.props;
        return (
            `   <div class="found-users">
                   
                </div>
            `
        )
    }
}


const mapStateToPropsShort = ({ usersFound }): object => {
    return { usersFound }
}

export default connect(mapStateToPropsShort)(UsersList);

// ${container.usersKeys.map((key) => `{{{ ${key} }}}`).join("")}
