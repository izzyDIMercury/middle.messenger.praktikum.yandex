import Block from "../../core/block.ts";
import ReturnButton from "../../components/return-button/return-button.ts";
import ProfileForm from "../../components/profile-form/profile-form.ts";
import Button from "../../components/button/button.ts";
import ProfileImage from "../../components/profile-image/profile-image.ts";
import { switchPage, fillUserInfo } from "../../core/utils.ts";
import { connect } from "../../core/connect.ts";
import SettingsController from "../../controllers/settings.ts";

type ChangePasswordPageProps = {};

class ProfileChangePasswordPage extends Block<ChangePasswordPageProps> {
    constructor(props: ChangePasswordPageProps) {
        super({
            ...props
        });
    }

    init() {
        const handleBlurBind = this.handleBlur.bind(this);
        const handleSubmitBind = this.handleSubmit.bind(this);
        const handleMouseOverBind = this.handleMouseOver.bind(this);

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
                    title: "Старый пароль",
                    name: "oldPassword",
                    type: "password",
                    label: "old_password",
                    blur: handleBlurBind
                },
                {
                    className: "profile-form__input",
                    title: "Новый пароль",
                    name: "newPassword",
                    type: "password",
                    label: "new_password",
                    blur: handleBlurBind
                },
                {
                    className: "profile-form__input",
                    title: "Повторите новый пароль",
                    name: "newPassword",
                    type: "password",
                    label: "confirm_password",
                    blur: handleBlurBind
                }
            ]
        });
        const ProfileButton = new Button({
            className: "profile-change-password-page",
            page: "settings",
            text: "Сохранить",
            events: {
                click: handleSubmitBind,
                mouseover: handleMouseOverBind
            }
        });
        const Avatar = new ProfileImage({
            className: "profile-change-password-page__image",
            src: "/assets/profile-placeholder.png",
            alt: "Аватар пользователя",
            path: ""
        });

        this.children = {
            ButtonBack,
            Form,
            ProfileButton,
            Avatar
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


    handleSubmit(event: FocusEvent | MouseEvent) {
        event.preventDefault();
        const controller = new SettingsController();
        controller.changePassword([ "profile-change-password-page__form", "profile-change-password-page__error-text", false, event.type ], event.type);
    }

    componentDidMount(): void {
        fillUserInfo("change-password")
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
                            <form class="profile-change-password-page__form">
                                <div class="profile-change-password-page__form-data">
                                    {{{ Avatar }}}
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

export default connect(mapStateToPropsShort)(ProfileChangePasswordPage);
