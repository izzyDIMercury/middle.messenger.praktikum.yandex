import Block from "../../core/block.ts";
import PageTitle from "../../components/page-title/page-title.ts";
import InputField from "../../components/input-field/input-field.ts";
import Button from "../../components/button/button.ts";
import Link from "../../components/link/link.ts";
import Loading from "../../components/loading/loading.ts";
import { switchPage } from "../../core/utils.ts";
import { connect } from "../../core/connect.ts";
import LoginController from "../../controllers/login.ts";

type LoginPageProps = {};

class LoginPage extends Block<LoginPageProps> {
    constructor(props: LoginPageProps) {
        super({
            ...props
        });
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
            enabled: true,
            blur: handleBlurBind
        });
        const InputPassword = new InputField({
            className: "login-page__input",
            title: "Пароль",
            name: "password",
            label: "password",
            type: "password",
            enabled: true,
            blur: handleBlurBind
        });
        const LoginButton = new Button({
            className: "login-page__button",
            text: "Вход",
            page: "messenger",
            events: {
                click: handleSubmitBind
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

        const LoadingWindow = new Loading()

        this.children = {
            Title,
            InputLogin,
            InputPassword,
            LoginButton,
            LoginLink,
            Error404Link,
            Error500Link,
            LoadingWindow
        };
    }

    handleBlur(event: FocusEvent) {
        event.preventDefault();
        this.handleSubmit(event);
    }

    handleSubmit(event: FocusEvent | MouseEvent) {
        event.preventDefault();
        const controller = new LoginController();
        controller.login([ "login-page", "login-page__error-text", false, event.type ], event.type);
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
                    {{#if isLoading}}
                        {{{ LoadingWindow }}}
                    {{/if}}
                </main>
            </div>  
            `
        );
    }
}


const mapStateToPropsShort = ({ isLoading }): object => {
    return { isLoading }
}

export default connect(mapStateToPropsShort)(LoginPage);
