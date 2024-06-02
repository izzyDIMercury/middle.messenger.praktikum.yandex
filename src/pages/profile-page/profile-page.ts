import Block from "../../core/block.ts";
import PageTitle from "../../components/page-title/page-title.ts";
import ReturnButton from "../../components/return-button/return-button.ts";
import ProfileFooter from "../../components/profile-footer/profile-footer.ts";
import ProfileForm from "../../components/profile-form/profile-form.ts";
import Image from "../../components/image/image.ts";
import { switchPage } from "../../core/utils.ts";


export default class ProfilePage extends Block {

    constructor(props) {
        super("form", {
            ...props
        })
    }

    init() {
        const Title = new PageTitle({
            className: "profile-page__title",
            title: "Имя пользователя"
        });
        const ButtonBack = new ReturnButton({
            events: {
                click: switchPage
            }
        });
        const ProfileImage = new Image({
            className: "profile-page__image",
            src: "/assets/profile-placeholder.png",
            alt: "Аватар пользователя"
        });
        const Footer = new ProfileFooter({
            buttons: [
                {
                    classModifier: "",
                    page: "profile-change-data",
                    text: "Изменить данные",
                    switchPage: switchPage
                },
                {
                    classModifier: "",
                    page: "profile-change-password",
                    text: "Изменить пароль",
                    switchPage: switchPage
                },
                {
                    classModifier: "profile-footer-button_red",
                    page: "profile",
                    text: "Выйти"
                }
            ]
        })
        const Form = new ProfileForm({
            formEnabled: false,
            formData: [
                {
                    className: "profile-form__input",
                    title: "Почта",
                    name: "email",
                    type: "email"
                },
                {
                    className: "profile-form__input",
                    title: "Логин",
                    name: "login",
                    type: "text"
                },
                {
                    className: "profile-form__input",
                    title: "Имя",
                    name: "first_name",
                    type: "text"
                },
                {
                    className: "profile-form__input",
                    title: "Фамилия",
                    name: "second_name",
                    type: "text"
                },
                {
                    className: "profile-form__input",
                    title: "Имя в чате",
                    name: "display_name",
                    type: "text"
                },
                {
                    className: "profile-form__input",
                    title: "Телефон",
                    name: "phone",
                    type: "tel"
                }
            ]
        })

        this.children = {
            Title,
            ButtonBack,
            ProfileImage,
            Footer,
            Form
        }
    }

    render() {
        return (
                `
                    <main class="profile-page">
                        {{{ ButtonBack }}}
                        <div class="profile-page__content">
                            <form class="profile-page__form">
                                {{{ ProfileImage }}}
                                {{{ Title }}}
                                {{{ Form }}}
                            </form>
                            {{{ Footer }}}
                        </div>
                    </main>
                `
        )
    }
}

