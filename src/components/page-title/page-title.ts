import Block from "../../core/block.ts";

type PageTitleProps = {
    className?: string,
    title: string
};

export default class PageTitle extends Block<PageTitleProps> {
    constructor(props: PageTitleProps) {
        super("div", {
            ...props,
        });
    }

    render() {
        return (
            `
                <h1 class="page-title{{#if className}} {{ className }} {{/if}}">{{ title }}</h1>
            `
        );
    }
}
