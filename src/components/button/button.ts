import Block from "../../core/block.ts";
import { Props } from "../../types.ts";

export default class Button extends Block {
    constructor(props: Props) {
        super("", {
            ...props
        })
    }

    render() {
        return (
            `
                <button class="button{{#if className}} {{ className }} {{/if}}" page={{ page }} type="submit">
                    <p class="button__text" page="{{ page }}">{{ text }}</p>
                </button>     
            `
        )
    }
}
