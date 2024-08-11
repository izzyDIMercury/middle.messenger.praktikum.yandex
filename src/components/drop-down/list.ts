import Block from "../../core/block.ts";
import { connect } from "../../core/connect.ts";
import User from "./item.ts";
import Chat from "../../controllers/chat.ts";
import type { StoreType } from "../../types.ts";

type UsersListProps = {};

class UsersList extends Block<UsersListProps> {
    constructor(props: UsersListProps) {
        super({
            ...props
        })
    }

    public handleSelect(event: MouseEvent) {
        const target = event.target as unknown as HTMLElement;
        const element = target.closest("div") as HTMLElement;
        const userId = element.getAttribute("userid") as string;

        const controller = new Chat();
        controller.addUserToChat(Number(userId));

        // console.log(element);
    }

    componentDidUpdate(): void {
        const handleSelectBind = this.handleSelect.bind(this);

        const store = this.props as StoreType;
        if (store.usersFound) {
            const props = this.props as StoreType;
            const users = props.usersFound.map(element => new User({ 
                first_name: element.first_name,
                second_name: element.second_name,
                userId: element.id,
                events: {
                    mousedown: handleSelectBind
                }
            }))
            const root = document.querySelector(".found-users__list") as HTMLElement;
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


const mapStateToPropsShort = (props: StoreType): object => {
    return {
        usersFound: props.usersFound
    }
}

export default connect(mapStateToPropsShort)(UsersList);

