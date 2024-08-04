import Block from "../../core/block.ts";
import { connect } from "../../core/connect.ts";

class User extends Block {

    constructor(props) {
        super({
            ...props
        })
    }

    render() {
        // console.log("AND HERE ", this.props);
        return (
            `
                <p>{{ name }}</p>
            `
        )
    }
}

const mapStateToPropsShort = ({ usersFound }): object => {
    return { usersFound }
}

export default connect(mapStateToPropsShort)(User);
