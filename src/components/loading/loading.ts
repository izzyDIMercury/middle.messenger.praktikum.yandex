import Block from "../../core/block.ts";
import Image from "../image/image.ts";

type LoadingProps = {
    className?: string,
    page: string,
    text: string,
    events: {
        click: Function
    }
};

export default class Loading extends Block<LoadingProps> {
    constructor(props: LoadingProps) {
        super({
            ...props
        });
    }

    init() {
        const Loading = new Image({
            className: "loading-icon",
            src: "/assets/icons/loading.gif",
            alt: "Анимация загрузки",
            path: ""
        });

        this.children = {
            Loading
        };
    }

    render() {
        return (
            `
                <div class="loading-window">
                    {{{ Loading }}}
                </div>
            `
        );
    }
}
