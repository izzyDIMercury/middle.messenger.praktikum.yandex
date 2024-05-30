import Block from "../../core/block.ts";

export default class Button extends Block {
    constructor(props) {
        super("div", {
            ...props
        })
    }

    render() {
        return (
            `
                <button class="button{{#if className}} {{ className }} {{/if}}" page="{{ page }}" type="submit">
                    <p class="button__text" page="{{ page }}">{{ text }}</p>
                </button>        
            `
        )
    }
}
