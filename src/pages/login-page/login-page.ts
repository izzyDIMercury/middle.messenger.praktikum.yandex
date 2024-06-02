import Block from "../../core/block.ts";
import PageTitle from "../../components/page-title/page-title.ts";
import InputField from "../../components/input-field/input-field.ts";
import Button from "../../components/button/button.ts";
import Link from "../../components/link/link.ts";
import { switchPage, checkForErrors, showErrorMessage } from "../../core/utils.ts";


export default class LoginPage extends Block {

    constructor(props) {
        super("form", {
            ...props
        })
    }

    init() {
        const handleBlurBind = this.handleBlur.bind(this);
        const handleSubmitBind = this.handleSubmit.bind(this);

        const Title = new PageTitle({
            className: "login-page__title",
            title: "Вход"
        });
        const InputLogin = new InputField({
            className: "login-page__input",
            title: "Логин",
            name: "login",
            type: "text",
            label: "login",
            blur: handleBlurBind
        });
        const InputPassword = new InputField({
            className: "login-page__input",
            title: "Пароль",
            name: "password",
            label: "password",
            type: "password",
            blur: handleBlurBind
        });
        const LoginButton = new Button({
            className: "login-page__button",
            text: "Вход",
            page: "chat",
            events: {
                click: handleSubmitBind
            }
        });
        const LoginLink = new Link({
            className: "login-page__link",
            text: "Нет аккаунта?",
            page: "register",
            events: {
                click: switchPage
            }
        });
        const Error404Link = new Link({
            text: "404",
            page: "404",
            events: {
                click: switchPage
            }
        });
        const Error500Link = new Link({
            text: "500",
            page: "500",
            events: {
                click: switchPage
            }
        });

        this.children = {
            Title,
            InputLogin,
            InputPassword,
            LoginButton,
            LoginLink,
            Error404Link,
            Error500Link
        }
    }

    handleBlur(e) {
        this.handleSubmit(e);
    }

    handleSubmit(e) {
        e.preventDefault();
        const result = checkForErrors(".login-page", "input");
        if (result.hasErrors) {
            // console.log(this);
            showErrorMessage(result, ".login-page__content", "login-page__error-text");
        } else {
            alert("Login successful!");
            switchPage(null, "chat");
        }
    }


    render() {
        return (`
            <div class="dialog-wrapper">
                <div class="error-links">
                <p class="error-links__text">Ссылки на страницы 404 и 500</p>
                {{{ Error404Link }}}
                {{{ Error500Link }}}
            </div>
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

// document.dispatchEvent(new CustomEvent("switchPage", { detail: {
//     page: "chat"
// }}));
