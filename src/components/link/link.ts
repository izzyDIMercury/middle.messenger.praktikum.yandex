import Block from "../../core/block.ts";

export default class Link extends Block {
    constructor(props) {
        super("div", {
            ...props
        })
    }

    render() {
        return (
            `
                <div class="link{{#if className}} {{ className }} {{/if}}">
                    <span class="{{ className }} link__text" page="{{ page }}">{{ text }}</span>
                </div>
            `
        )
    }
}
