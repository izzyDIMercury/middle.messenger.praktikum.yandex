import Block from "../../core/block.ts";
import { connect } from "../../core/connect.ts";
import UsersList from "./list.ts";
import type { StoreType } from "../../types.ts";

type DropDownProps = {};

class DropDown extends Block<DropDownProps> {

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

const mapStateToPropsShort = (store: StoreType): object => {
    return {
        usersFound: store.usersFound
    }
}

export default connect(mapStateToPropsShort)(DropDown);
