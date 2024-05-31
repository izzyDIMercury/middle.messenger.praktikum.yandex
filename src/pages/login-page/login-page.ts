import Block from "../../core/block.ts";
import PageTitle from "../../components/page-title/page-title.ts";
import InputField from "../../components/input-field/input-field.ts";
import Button from "../../components/button/button.ts";
import Link from "../../components/link/link.ts";


export default class LoginPage extends Block {

    constructor(props) {
        super("form", {
            ...props
        })
    }

    init() {
        const handleBlurBind = this.handleBlur.bind(this);

        const Title = new PageTitle({
            className: "login-page__title",
            title: "Вход"
        });
        const InputLogin = new InputField({
            className: "login-page__input",
            title: "Логин",
            name: "login",
            type: "text",
            onBlur: handleBlurBind
        });
        const InputPassword = new InputField({
            className: "login-page__input",
            title: "Пароль",
            name: "password",
            type: "password"
        });
        const LoginButton = new Button({
            className: "login-page__button",
            text: "Вход",
            page: "chat"
        });
        const LoginLink = new Link({
            className: "login-page__link",
            text: "Нет аккаунта?",
            page: "register"
        });

        this.children = {
            Title,
            InputLogin,
            InputPassword,
            LoginButton,
            LoginLink
        }
    }

    handleBlur(event) {
        console.log("event");
    }

    render() {
        return (`
            <div class="dialog-wrapper">
                <main class="dialog">
                    <form class="login-page">
                        <div class="login-page__content">
                            {{{ Title }}}
                            <ul class="login-page__input-elements">
                                {{{ InputLogin }}}
                                {{{ InputPassword }}}
                            </ul>
                        </div>
                        <div class="login-page__footer">
                            {{{ LoginButton }}}
                            {{{ LoginLink }}}
                        </div>
                    </form>
                </main>
            </div>  
            `
        )
    }
}
