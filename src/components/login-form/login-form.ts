import Block from "../../core/block.ts";
import PageTitle from "../../components/page-title/page-title.ts";
import InputField from "../../components/input-field/input-field.ts";
import Button from "../../components/button/button.ts";
import Link from "../../components/link/link.ts";
import { switchPage } from "../../core/utils.ts";
// import { connect } from "../../core/connect.ts";
// import LoginController from "../../controllers/login.ts";

type LoginFormProps = {
    blur: (event: FocusEvent) => void,
    mouseover: (event: MouseEvent) => void;
    events: {
        submit: Function
    }
};

export default class LoginForm extends Block<LoginFormProps> {
    constructor(props: LoginFormProps) {
        super({
            ...props
        });
    }

    init() {
        const { blur, mouseover } = this.props as LoginFormProps;

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
            enabled: true,
            blur: blur
        });
        const InputPassword = new InputField({
            className: "login-page__input",
            title: "Пароль",
            name: "password",
            label: "password",
            type: "password",
            enabled: true,
            blur: blur
        });
        const LoginButton = new Button({
            className: "login-page__button",
            text: "Вход",
            page: "messenger",
            events: {
                mouseover: mouseover
            }
        });
        const LoginLink = new Link({
            className: "login-page__link",
            text: "Нет аккаунта?",
            page: "sing-up",
            events: {
                click: switchPage
            }
        });

        this.children = {
            Title,
            InputLogin,
            InputPassword,
            LoginButton,
            LoginLink
        };
    }

    // handleBlur(event: FocusEvent) {
    //     event.preventDefault();
        
    // }

    render() {
        return (
            `
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
            `
        );
    }
}
