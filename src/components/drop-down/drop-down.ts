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
        // console.log("DDREN", this.props.usersFound)
        return (
            `   <div>
                    {{{ UserFound }}}       
                </div>
            `
        )
    }
}

// {{#if usersFound}}
//     <p>s</p>
//     {{{ UserFound }}}
// {{/if}}


const mapStateToPropsShort = ({ usersFound }): object => {
    return { usersFound }
}

export default connect(mapStateToPropsShort)(DropDown);
