import Block from "../../core/block.ts";
import { connect } from "../../core/connect.ts";
// import ProfileImage from "../profile-image/profile-image.ts";
import type { StoreType } from "../../types.ts";

type UserProps = {};

class User extends Block<UserProps> {

    constructor(props: UserProps) {
        super({
            ...props
        })
    }

    render() {
        return (
            `   <div userId={{ userId }} class="found-user">
                    <p class="found-user__name">{{ first_name }} {{ second_name }}</p>
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

export default connect(mapStateToPropsShort)(User);
