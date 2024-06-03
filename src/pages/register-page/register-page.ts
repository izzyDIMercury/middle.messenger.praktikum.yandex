import Block from "../../core/block.ts";
import PageTitle from "../../components/page-title/page-title.ts";
import Button from "../../components/button/button.ts";
import Link from "../../components/link/link.ts";
import RegisterPageList from "../../components/register-page-list/register-page-list.ts";
import { switchPage, checkForErrors, showErrorMessage, hideErrorMessage } from "../../core/utils.ts";


export default class RegisterPage extends Block {

    constructor(props) {
        super("form", {
            ...props
        })
    }

    init() {
        const handleBlurBind = this.handleBlur.bind(this);
        const handleSubmitBind = this.handleSubmit.bind(this);

        const Title = new PageTitle({
            className: "register-page__title",
            title: "Регистрация"
        });
        const RegisterButton = new Button({
            className: "register-page__button",
            text: "Зарегистрироваться",
            page: "chat",
            events: {
                click: handleSubmitBind
            }
        });
        const RegisterLink = new Link({
            className: "register-page__link",
            text: "Войти",
            page: "login",
            events: {
                click: switchPage
            }
        })
        const RegisterList = new RegisterPageList({
            list: [
                {
                    className: "register-page__input",
                    title: "Почта",
                    name: "email",
                    type: "email",
                    label: "email",
                    blur: handleBlurBind
                },
                {
                    className: "register-page__input",
                    title: "Логин",
                    name: "login",
                    type: "text",
                    label: "login",
                    blur: handleBlurBind
                },
                {
                    className: "register-page__input",
                    title: "Имя",
                    name: "first_name",
                    type: "text",
                    label: "first_name",
                    blur: handleBlurBind
                },
                {
                    className: "register-page__input",
                    title: "Фамилия",
                    name: "second_name",
                    type: "text",
                    label: "second_name",
                    blur: handleBlurBind
                },
                {
                    className: "register-page__input",
                    title: "Телефон",
                    name: "tel",
                    type: "tel",
                    label: "tel",
                    blur: handleBlurBind
                },
                {
                    className: "register-page__input",
                    title: "Пароль",
                    name: "password",
                    type: "password",
                    label: "password",
                    blur: handleBlurBind
                },
                {
                    className: "register-page__input",
                    title: "Пароль (еще раз)",
                    name: "password",
                    type: "password",
                    label: "password",
                    blur: handleBlurBind
                }
            ]
        })

        this.children = {
            Title,
            RegisterButton,
            RegisterLink,
            RegisterList
        }
    }

    handleBlur(e) {
        this.handleSubmit(e);
    }

    handleSubmit(e) {
        e.preventDefault();
        const result = checkForErrors(".register-page", "input");
        if (result.hasErrors) {
            // console.log(this);
            showErrorMessage(result, ".register-page__content", "login-page__error-text");
        } else if (e.type === "click") {
            console.log("Regsitration successful!");
            switchPage(null, "chat");
        } else {
            hideErrorMessage("login-page__error-text");
            console.log("Registration successful!");
        }
    }
    

    render() {
        return (
                `
                    <div class="dialog-wrapper">
                        <main class="dialog">
                            <form class="register-page">
                                <div class="register-page__content">
                                    {{{ Title }}}
                                    <ul class="register-page__input-elements">
                                        {{{ RegisterList }}}
                                    </ul>
                                </div>
                                <div class="register-page__footer">
                                    {{{ RegisterButton }}}
                                    {{{ RegisterLink }}}
                                </div>
                            </form>
                        </main>
                    </div>    
                `
        )
    }
}

