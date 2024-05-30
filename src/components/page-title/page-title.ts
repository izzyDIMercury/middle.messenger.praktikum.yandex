import Block from "../../core/block.ts";

export default class PageTitle extends Block {
    constructor(props) {
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
