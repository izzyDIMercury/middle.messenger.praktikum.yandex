import Block from "../../core/block.ts";
import { connect } from "../../core/connect.ts";
import ProfileImage from "../profile-image/profile-image.ts";

class User extends Block {

    constructor(props) {
        super({
            ...props
        })
    }

    render() {
        return (
            `   <div class="found-user">
                    <p class="found-user__name">{{ first_name }} {{ second_name }}</p>
                </div>
            `
        )
    }
}

const mapStateToPropsShort = ({ usersFound }): object => {
    return { usersFound }
}

export default connect(mapStateToPropsShort)(User);
