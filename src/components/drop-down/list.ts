import Block from "../../core/block.ts";
import { connect } from "../../core/connect.ts";
import User from "./item.ts";

class UsersList extends Block {
    constructor(props) {
        super({
            ...props
        })
    }

    componentDidUpdate() {
        if (this.props.usersFound) {
            const users = this.props.usersFound.map(element => new User({ 
                first_name: element.first_name,
                second_name: element.second_name
            }))
            const root = document.querySelector(".found-users__list");
            root.textContent = "";
            let counter: number = 0;
            users.forEach(el => {
                if (counter < 3) {
                    counter++;
                    root?.appendChild(el.getContent());
                }
            })
            console.log(root);
        }
    }

    render() {
        return (
            `   <ul class="found-users__list">                   
                </ul>
            `
        )
    }
}


const mapStateToPropsShort = ({ usersFound }): object => {
    return { usersFound }
}

export default connect(mapStateToPropsShort)(UsersList);

// ${container.usersKeys.map((key) => `{{{ ${key} }}}`).join("")}
