import Block from "../../core/block.ts";
import PageTitle from "../../components/page-title/page-title.ts";
import Button from "../../components/button/button.ts";
import Link from "../../components/link/link.ts";
import InputField from "../../components/input-field/input-field.ts";


export default class RegisterPage extends Block {

    constructor(props) {
        super("form", {
            ...props
        })
    }

    init() {
        const Title = new PageTitle({
            className: "register-page__title",
            title: "Имя Регистрация"
        });
        const RegisterButton = new Button({
            className: "register-page__button",
            text: "Зарегистрироваться",
            page: "chat"
        });
        const RegisterLink = new Link({
            className: "register-page__link",
            text: "Войти",
            page: "login"
        })
        const RegisterList = new RegisterPageList({
            list: [
                {
                    className: "register-page__input",
                    title: "Почта",
                    name: "email",
                    type: "email"
                },
                {
                    className: "register-page__input",
                    title: "Логин",
                    name: "login",
                    type: "text"
                },
                {
                    className: "register-page__input",
                    title: "Имя",
                    name: "first_name",
                    type: "text"
                },
                {
                    className: "register-page__input",
                    title: "Фамилия",
                    name: "second_name",
                    type: "text"
                },
                {
                    className: "register-page__input",
                    title: "Телефон",
                    name: "phone",
                    type: "tel"
                },
                {
                    className: "register-page__input",
                    title: "Пароль",
                    name: "password",
                    type: "password"
                },
                {
                    className: "register-page__input",
                    title: "Пароль (еще раз)",
                    name: "password",
                    type: "password"
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

class RegisterPageList extends Block {

    constructor(props) {
        const items = props.list.reduce((acc, current) => {
            const item = new InputField({className: current.className, title: current.title, name: current.name, type: current.type});
            console.log(item);
            acc[item.id] = item;

            return acc;
        }, {});

        super("div", {
            ...props,
            itemsKeys: Object.keys(items),
            ...items
        })
    }

    render() {
        return (
            `
                <ul class="register-page__input-elements">
                    ${this.props.itemsKeys.map((key) => `{{{ ${key} }}}`).join('')}
                </ul>
            `
        )
    }
}
