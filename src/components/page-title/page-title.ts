import Block from "../../core/block.ts";
import { Props } from "../../types.ts";


export default class PageTitle extends Block {
    constructor(props: Props) {
        super("div", {
            ...props
        })
    }

    render() {
        return (
            `
                <h1 class="page-title{{#if className}} {{ className }} {{/if}}">{{ title }}</h1>
            `
        )
    }
}
