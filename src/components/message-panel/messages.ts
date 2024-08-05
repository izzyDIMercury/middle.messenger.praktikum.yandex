import Block from "../../core/block.ts";
import { connect } from "../../core/connect.ts";
import Message from "./message.ts";

class Messages extends Block {
    constructor(props) {
        super({
            props
        });
    }

    init() {
        const NewMessage = new Message({
            currentMessage: this.props.currentMessage
        })

        this.children = {
            NewMessage
        }
    }

    componentDidUpdate() {
        // const container = document.querySelector(".message-text");
        // console.log(container, this.props.currentMessage);
        // container.textContent = this.props.currentMessage;
    }

    render() {
        console.log("rendered");
        // console.log(this.props);
        // setTimeout(() => {
        //     console.log(this.props);
        // }, 5000)
        return (
            `
                <div class="message-window">
                    {{{ NewMessage }}}
                </div>
            `
        )
    }
}


const mapStateToPropsShort = ({ currentMessage }): object => {
    return {
        currentMessage
    }
}

export default connect(mapStateToPropsShort)(Messages);
