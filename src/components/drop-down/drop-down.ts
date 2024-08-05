import Block from "../../core/block.ts";
import { connect } from "../../core/connect.ts";
import UsersList from "./list.ts";

type DropDownProps = {};

class DropDown extends Block<DropDownProps> {

    // public usersFound: [] = [];

    constructor(props: DropDownProps) {
        super({
            ...props
        })
    }

    init() {
        const UserFound = new UsersList({
            
        })

        this.children = {
            UserFound
        }
    }


    render() {
        return (
            `   <div class="found-users">
                    {{{ UserFound }}}       
                </div>
            `
        )
    }
}



const mapStateToPropsShort = ({ usersFound }): object => {
    return { usersFound }
}

export default connect(mapStateToPropsShort)(DropDown);
