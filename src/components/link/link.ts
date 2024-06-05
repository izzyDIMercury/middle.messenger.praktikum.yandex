import Block from "../../core/block.ts";

type LinkProps = {
    className?: string,
    page: string,
    text: string,
    events: {
        click: Function
    }
};

export default class Link extends Block<LinkProps> {
    constructor(props: LinkProps) {
        super("div", {
            ...props,
        });
    }

    render() {
        return (
            `
                <div class="link{{#if className}} {{ className }} {{/if}}">
                    <span class="{{ className }} link__text" page="{{ page }}">{{ text }}</span>
                </div>
            `
        );
    }
}
