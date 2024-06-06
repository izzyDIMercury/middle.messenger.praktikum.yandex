import Block from "../../core/block.ts";
import ReturnButton from "../../components/return-button/return-button.ts";
import ProfileForm from "../../components/profile-form/profile-form.ts";
import Button from "../../components/button/button.ts";
import Image from "../../components/image/image.ts";
import FormSubmit from "../../core/formSubmit.ts";
import { switchPage } from "../../core/utils.ts";

type ChangeDataPageProps = {};

export default class ProfileChangeDataPage extends Block<ChangeDataPageProps> {
    constructor(props: ChangeDataPageProps) {
        super("form", {
            ...props
        });
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
            formItemsKeys: [],
            formEnabled: true,
            formData: [
                {
                    className: "profile-form__input",
                    title: "Почта",
                    name: "email",
                    type: "email",
                    label: "email",
                    blur: handleBlurBind
                },
                {
                    className: "profile-form__input",
                    title: "Логин",
                    name: "login",
                    type: "text",
                    label: "login",
                    blur: handleBlurBind
                },
                {
                    className: "profile-form__input",
                    title: "Имя",
                    name: "first_name",
                    type: "text",
                    label: "first_name",
                    blur: handleBlurBind
                },
                {
                    className: "profile-form__input",
                    title: "Фамилия",
                    name: "second_name",
                    type: "text",
                    label: "second_name",
                    blur: handleBlurBind
                },
                {
                    className: "profile-form__input",
                    title: "Имя в чате",
                    name: "display_name",
                    type: "text",
                    label: "display_name",
                    blur: handleBlurBind
                },
                {
                    className: "profile-form__input",
                    title: "Телефон",
                    name: "tel",
                    type: "tel",
                    label: "tel",
                    blur: handleBlurBind
                }
            ]
        });
        const ProfileButton = new Button({
            className: "profile-change-data-page",
            page: "profile",
            text: "Сохранить",
            events: {
                click: handleSubmitBind
            }
        });
        const ProfileImage = new Image({
            className: "profile-change-data-page__image",
            src: "/assets/profile-placeholder.png",
            alt: "Аватар пользователя"

        });

        this.children = {
            ButtonBack,
            Form,
            ProfileButton,
            ProfileImage
        };
    }

    handleBlur(event: FocusEvent) {
        this.handleSubmit(event);
    }

    handleSubmit(event: FocusEvent | MouseEvent) {
        event.preventDefault();

        const submit = new FormSubmit("profile-change-data-page__form", "profile-change-data-page__form-data", "profile-change-data-page__error-text");
        if (submit.validated && event.type === "click") {
            submit.sendData("https://chats", "get");
            switchPage(null, "chat");
        }
    }

    render() {
        return (
            `
                    <main class="profile-page">
                        {{{ ButtonBack }}}
                        <div class="profile-page__content">
                            <form class="profile-change-data-page__form">
                                <div class="profile-change-data-page__form-data">
                                    {{{ ProfileImage }}}
                                    {{{ Form }}}
                                </div>
                                {{{ ProfileButton }}}
                            </form>
                        </div>
                    </main>
                `
        );
    }
}
