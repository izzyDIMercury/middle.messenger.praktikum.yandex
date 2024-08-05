import Block from "../../core/block.ts";
import { connect } from "../../core/connect.ts";
import User from "./item.ts";
import Chat from "../../controllers/chat.ts";

class UsersList extends Block {
    constructor(props) {
        super({
            ...props
        })
    }

    public handleSelect(event: MouseEvent) {
        const target = event.target as unknown as HTMLElement;
        const element = target.closest("div") as HTMLElement;
        const userId = element.getAttribute("userid");

        const controller = new Chat();
        controller.createChatWithUser(userId);

        // console.log(element);
    }

    componentDidUpdate() {
        const handleSelectBind = this.handleSelect.bind(this);
        if (this.props.usersFound) {
            const users = this.props.usersFound.map(element => new User({ 
                first_name: element.first_name,
                second_name: element.second_name,
                userId: element.id,
                events: {
                    mousedown: handleSelectBind
                }
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
