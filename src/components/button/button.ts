import Block from "../../core/block.ts";

type ButtonProps = {
    className: string,
    text: string,
    page: string,
    events: {
        click: (event: MouseEvent) => void
    }
};

export default class Button extends Block<ButtonProps> {
    constructor(props: ButtonProps) {
        super("", {
            ...props,
        });
    }

    render() {
        return (
            `
                <button class="button{{#if className}} {{ className }} {{/if}}" page={{ page }} type="submit">
                    <p class="button__text" page="{{ page }}">{{ text }}</p>
                </button>     
            `
        );
    }
}
