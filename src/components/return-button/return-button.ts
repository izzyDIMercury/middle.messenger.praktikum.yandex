import Block from "../../core/block.ts";
import Image from "../image/image.ts";
import { Props } from "../../types.ts";


export default class ReturnButton extends Block {

    constructor(props: Props) {
        super("form", {
            ...props
        })
    }

    init() {
        const ArrowLeft = new Image({
            className: "return-button__arrow",
            src: "/assets/icons/arrow-left.png",
            alt: "Стрелка",
            page: "chat"
        });

        this.children = {
            ArrowLeft
        }
    }


    render() {
        return (
                `
                    <button class="return-button" page="chat">
                        {{{ ArrowLeft }}}
                        <p class="return-button__text" page="chat">Вернуться</p>
                    </button>
                `
        )
    }
}
