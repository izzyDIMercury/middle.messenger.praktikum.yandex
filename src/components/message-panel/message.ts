import Block from "../../core/block.ts";
import { connect } from "../../core/connect.ts";

class Message extends Block {
    constructor(props) {
        super({
            props
        });
    }

    render() {
        return (
           `<p class="message-text">{{ currentMessage }}</p>`
        )
    }
}

const mapStateToPropsShort = ({ currentMessage }): object => {
    return {
        currentMessage
    }
}

export default connect(mapStateToPropsShort)(Message);
