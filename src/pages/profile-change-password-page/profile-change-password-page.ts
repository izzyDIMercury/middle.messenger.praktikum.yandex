import Block from "../../core/block.ts";
import ReturnButton from "../../components/return-button/return-button.ts";
import ProfileForm from "../../components/profile-form/profile-form.ts";
import Button from "../../components/button/button.ts";
import Image from "../../components/image/image.ts";
import { switchPage, checkForErrors, showErrorMessage } from "../../core/utils.ts";


export default class ProfileChangePasswordPage extends Block {

    constructor(props) {
        super("form", {
            ...props
        })
    }

    init() {
        const handleBlurBind = this.handleBlur.bind(this);
        const handleSubmitBind = this.handleSubmit.bind(this);

        const ButtonBack = new ReturnButton({
            events: {
                click: switchPage
            }
        });
        const Form = new ProfileForm({
            formData: [
                {
                    className: "profile-form__input",
                    title: "Старый пароль",
                    name: "oldPassword",
                    type: "password",
                    label: "password",
                    onBlur: handleBlurBind
                },
                {
                    className: "profile-form__input",
                    title: "Новый пароль",
                    name: "newPassword",
                    type: "password",
                    label: "password",
                    onBlur: handleBlurBind
                },
                {
                    className: "profile-form__input",
                    title: "Повторите новый пароль",
                    name: "newPassword",
                    type: "password",
                    label: "password",
                    onBlur: handleBlurBind
                }
            ]
        });
        const ProfileButton = new Button({
            className: "profile-change-password-page",
            page: "profile",
            text: "Сохранить",
            events: {
                click: handleSubmitBind
            }
        });
        const ProfileImage = new Image({
            className: "profile-change-password-page__image",
            src: "/assets/profile-placeholder.png",
            alt: "Аватар пользователя"

        })

        this.children = {
            ButtonBack,
            Form,
            ProfileButton,
            ProfileImage
        }
    }

    handleBlur(e) {
        this.handleSubmit(e);
    }

    handleSubmit(e) {
        e.preventDefault();
        const result = checkForErrors(".profile-change-password-page__form", "input");
        if (result.hasErrors) {
            console.log(this);
            showErrorMessage(result, ".profile-change-password-page__form-data", "profile-change-password-page__error-text");
        } else {
            alert("Login successful!");
            switchPage(null, "profile");
        }
    }


    render() {
        return (
                `
                    <main class="profile-page">
                        {{{ ButtonBack }}}
                        <div class="profile-page__content">
                            <form class="profile-change-password-page__form">
                                <div class="profile-change-password-page__form-data">
                                    {{{ ProfileImage }}}
                                    {{{ Form }}}
                                </div>
                                {{{ ProfileButton }}}
                            </form>
                        </div>
                    </main>
                `
        )
    }
}
