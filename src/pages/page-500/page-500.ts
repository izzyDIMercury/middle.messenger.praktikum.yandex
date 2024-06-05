import Block from "../../core/block.ts";
import Link from "../../components/link/link.ts";
import { switchPage } from "../../core/utils.ts";

type Page500Props = {};

export default class Page500 extends Block<Page500Props> {
    constructor(props: Page500Props) {
        super("form", {
            ...props,
        });
    }

    init() {
        const Error500Link = new Link({
            className: "error-page__link",
            page: "login",
            text: "Назад",
            events: {
                click: switchPage,
            },
        });

        this.children = {
            Error500Link,
        };
    }

    render() {
        return (
            `
                    <main class="error-page">
                        <div class="error-page__container">
                            <h1 class="error-page__title">500</h1>
                            <p class="error-page__text">Мы уже фиксим</p>
                            {{{ Error500Link }}}
                        </div>
                    </main>
                `
        );
    }
}
