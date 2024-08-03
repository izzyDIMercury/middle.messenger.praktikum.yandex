import Block from "../../core/block.ts";
import PageTitle from "../../components/page-title/page-title.ts";
import Button from "../../components/button/button.ts";
import Link from "../../components/link/link.ts";
import RegisterPageList from "../../components/register-page-list/register-page-list.ts";
import FormSubmit from "../../core/formSubmit.ts";
import { switchPage } from "..//../core/utils.ts";
import { connect } from "../../core/connect.ts";
import RegisterController from "../../controllers/register.ts";

type RegisterPageProps = {};

class RegisterPage extends Block<RegisterPageProps> {
    constructor(props: RegisterPageProps) {
        super({
            ...props
        });
    }

    init() {
        const handleBlurBind = this.handleBlur.bind(this);
        const handleSubmitBind = this.handleSubmit.bind(this);
        const handleMouseOverBind = this.handleMouseOver.bind(this);

        const Title = new PageTitle({
            className: "register-page__title",
            title: "Регистрация"
        });
        const RegisterButton = new Button({
            className: "register-page__button",
            text: "Зарегистрироваться",
            page: "messenger",
            events: {
                click: handleSubmitBind,
                mouseover: handleMouseOverBind
            }
        });
        const RegisterLink = new Link({
            className: "register-page__link",
            text: "Войти",
            page: "login",
            events: {
                click: switchPage
            }
        });
        const RegisterList = new RegisterPageList({
            itemsKeys: [],
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
                    name: "phone",
                    type: "phone",
                    label: "phone",
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
                    label: "confirm_password",
                    blur: handleBlurBind
                }
            ]
        });

        this.children = {
            Title,
            RegisterButton,
            RegisterLink,
            RegisterList
        };
    }

    handleBlur(event: FocusEvent) {
        this.handleSubmit(event);
    }

    handleMouseOver(event: MouseEvent) {
        event.preventDefault();
        const inputs = document.querySelectorAll(".input__element") as NodeListOf<HTMLInputElement>;
        inputs.forEach(input => {
            input.blur();
        })
    }

    handleSubmit(event: FocusEvent) {
        event.preventDefault();
        const controller = new RegisterController();
        controller.register([ "register-page", "login-page__error-text", false, event.type ], event.type);
        
        // slash
        // Mas42er92s
        // id\":1627
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
        );
    }
}

const mapStateToPropsShort = ({ isLoading }): object => {
    return { isLoading }
}

export default connect(mapStateToPropsShort)(RegisterPage);
