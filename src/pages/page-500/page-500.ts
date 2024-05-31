import Block from "../../core/block.ts";
import Link from "../../components/link/link.ts";


export default class Page500 extends Block {

    constructor(props) {
        super("form", {
            ...props
        })
    }

    init() {
        const Error500Link = new Link({
            className: "error-page__link",
            page: "login",
            text: "Назад"
        });

        this.children = {
            Error500Link
        }
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
        )
    }
}
