import Block from "../../core/block.ts";
import Image from "../image/image.ts";

type ReturnButtonProps = {
    events: {
        click: Function
    }
}

export default class ReturnButton extends Block<ReturnButtonProps> {
    constructor(props: ReturnButtonProps) {
        super({
            ...props
        });
    }

    init() {
        const ArrowLeft = new Image({
            className: "return-button__arrow",
            src: "/assets/icons/arrow-left.png",
            alt: "Стрелка",
            page: "chat",
            path: ""
        });

        this.children = {
            ArrowLeft
        };
    }

    render() {
        return (
            `
                    <button class="return-button" page="chat">
                        {{{ ArrowLeft }}}
                        <p class="return-button__text" page="chat">Вернуться</p>
                    </button>
                `
        );
    }
}
