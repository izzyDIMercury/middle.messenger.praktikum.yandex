import Block from "../../core/block.ts";
import PageTitle from "../../components/page-title/page-title.ts";
import InputField from "../../components/input-field/input-field.ts";
import Button from "../../components/button/button.ts";
import Link from "../../components/link/link.ts";


export default class LoginPage extends Block {
    constructor(props) {
        super("form", {
            ...props,
            className: "login-page",
            PageTitle: new PageTitle({
                className: "login-page__title",
                title: "Вход"
            }),
            inputField1: new InputField({
                className: "login-page__input",
                title: "Логин",
                name: "login",
                type: "text"
            }),
            inputField2: new InputField({
                className: "login-page__input",
                title: "Пароль",
                name: "password",
                type: "password"
            }),
            button: new Button({
                className: "login-page__button",
                text: "Вход",
                page: "chat"
            }),
            link: new Link({
                className: "login-page__link",
                text: "Нет аккаунта?",
                page: "register"
            })
        })

        setTimeout(() => {
            this.children.PageTitle.setProps({ title: "Поход" })
        }, 1000);
    }


    render() {
        return (`
            <div class="dialog-wrapper">
                <main class="dialog">
                    <form class={{ className }}>
                        <div class="login-page__content">
                            {{{ PageTitle }}}
                            <ul class="login-page__input-elements">
                                {{{ inputField1 }}}
                                {{{ inputField2 }}}
                            </ul>
                        </div>
                        <div class="login-page__footer">
                            {{{ button }}}
                            {{{ link }}}
                        </div>
                    </form>
                </main>
            </div>  
            `
        )
    }
}
