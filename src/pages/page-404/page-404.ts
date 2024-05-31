import Block from "../../core/block.ts";
import Link from "../../components/link/link.ts";


export default class Page404 extends Block {

    constructor(props) {
        super("form", {
            ...props
        })
    }

    init() {
        const Error404Link = new Link({
            className: "error-page__link",
            page: "login",
            text: "Назад"
        });

        this.children = {
            Error404Link
        }
    }


    render() {
        return (
                `
                    <main class="error-page">
                        <div class="error-page__container">
                            <h1 class="error-page__title">404</h1>
                            <p class="error-page__text">Не туда попали</p>
                            {{{ Link }}}
                        </div>
                    </main>
                `
        )
    }
}
