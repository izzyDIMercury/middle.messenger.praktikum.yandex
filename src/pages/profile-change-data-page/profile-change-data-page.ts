import Block from "../../core/block.ts";
import ReturnButton from "../../components/return-button/return-button.ts";
import ProfileForm from "../../components/profile-form/profile-form.ts";
import Button from "../../components/button/button.ts";
import Image from "../../components/image/image.ts";
import FormSubmit from "../../core/formSubmit.ts";
import { switchPage } from "../../core/utils.ts";
import { connect } from "../../core/connect.ts";
import SettingsController from "../../controllers/settings.ts";
import Loading from "../../components/loading/loading.ts";

type ChangeDataPageProps = {};

class ProfileChangeDataPage extends Block<ChangeDataPageProps> {
    constructor(props: ChangeDataPageProps) {
        super({
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
                    name: "phone",
                    type: "phone",
                    label: "phone",
                    blur: handleBlurBind
                }
            ]
        });
        const ProfileButton = new Button({
            className: "profile-change-data-page",
            page: "settings",
            text: "Сохранить",
            events: {
                click: handleSubmitBind
            }
        });
        const ProfileImage = new Image({
            className: "profile-change-data-page__image",
            src: "/assets/profile-placeholder.png",
            alt: "Аватар пользователя",
            path: ""
        });

        const LoadingWindow = new Loading()

        this.children = {
            ButtonBack,
            Form,
            ProfileButton,
            ProfileImage,
            LoadingWindow
        };
    }

    handleBlur(event: FocusEvent) {
        this.handleSubmit(event);
    }

    handleSubmit(event: FocusEvent | MouseEvent) {
        event.preventDefault();
        const controller = new SettingsController();
        controller.changeProfile([ "profile-change-data-page__form", "profile-change-data-page__error-text", false, event.type ], event.type);

        // const submit = new FormSubmit("profile-change-data-page__form", "profile-change-data-page__error-text", false, event.type);
        // if (submit.validated && event.type === "click") {
        //     submit.sendData("https://chats", "get");
        //     switchPage(null, "settings");
        // }
    }

    render() {
        return (
            `
                    <main class="profile-page">
                        {{#if isLoading}}
                            {{{ LoadingWindow }}}
                        {{/if}}
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

const mapStateToPropsShort = ({ isLoading }): object => {
    return { isLoading }
}

export default connect(mapStateToPropsShort)(ProfileChangeDataPage);

