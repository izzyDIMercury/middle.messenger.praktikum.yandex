import Block from "../../core/block.ts";
import PageTitle from "../../components/page-title/page-title.ts";
import ReturnButton from "../../components/return-button/return-button.ts";
import ProfileFooter from "../../components/profile-footer/profile-footer.ts";
import ProfileForm from "../../components/profile-form/profile-form.ts";
import ProfileImage from "../../components/profile-image/profile-image.ts";
import { switchPage, fillUserInfo } from "../../core/utils.ts";
import { connect } from "../../core/connect.ts";
import SettingsController from "../../controllers/settings.ts";
import type { StoreType } from "../../types.ts";
// import { GlobalStore } from "../../store.ts";

type ProfilePageProps = {
    doFillProps: boolean
};

class ProfilePage extends Block<ProfilePageProps> {

    constructor(props: ProfilePageProps) {
        super({
            ...props
        });
        // fillUserInfo("settings");
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
        const Avatar = new ProfileImage({
            className: "profile-page__image",
            src: "/assets/profile-placeholder.png",
            alt: "Аватар пользователя",
            path: ""
        });
        const handleLogout = this.handleLogout.bind(this);
        const Footer = new ProfileFooter({
            buttonsKeys: [],
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
                    page: "settings",
                    text: "Выйти",
                    switchPage: handleLogout
                }
            ]
        });
        const handleBlurBind = this.handleBlur.bind(this);
        const Form = new ProfileForm({
            formItemsKeys: [],
            formEnabled: false,
            formData: [
                {
                    className: "profile-form__input",
                    title: "Почта",
                    name: "email",
                    type: "email",
                    label: "",
                    blur: handleBlurBind
                },
                {
                    className: "profile-form__input",
                    title: "Логин",
                    name: "login",
                    type: "text",
                    label: "",
                    blur: handleBlurBind
                },
                {
                    className: "profile-form__input",
                    title: "Имя",
                    name: "first_name",
                    type: "text",
                    label: "",
                    blur: handleBlurBind
                },
                {
                    className: "profile-form__input",
                    title: "Фамилия",
                    name: "second_name",
                    type: "text",
                    label: "",
                    blur: handleBlurBind
                },
                {
                    className: "profile-form__input",
                    title: "Имя в чате",
                    name: "display_name",
                    type: "text",
                    label: "",
                    blur: handleBlurBind
                },
                {
                    className: "profile-form__input",
                    title: "Телефон",
                    name: "phone",
                    type: "phone",
                    label: "",
                    blur: handleBlurBind
                }
            ]
        });

        this.children = {
            Title,
            ButtonBack,
            Avatar,
            Footer,
            Form
        };
    }

    handleBlur(event: FocusEvent) {
        return event;
    }

    handleLogout() {
        //@ts-expect-error can't properly type window.store
        window.store.setState({ doFillInfo: false });
        console.log("LOGOUT IN COMPONENT");
        const controller = new SettingsController();
        controller.logout();
        //@ts-expect-error can't properly type window.store
        window.store.setState({ doFillInfo: false });
    }

    componentDidMount(): void {
        fillUserInfo("settings");
        console.log("PROFILE MOUNT");
    }

    render() {
        return (
            `
                    <main class="profile-page">
                        {{{ ButtonBack }}}
                        <div class="profile-page__content">
                            <form class="profile-page__form">
                                {{{ Avatar }}}
                                {{{ Title }}}
                                {{{ Form }}}
                            </form>
                            {{{ Footer }}}
                        </div>
                    </main>
                `
        );
    }
}

const mapStateToPropsShort = (props: StoreType): object => {
    return {
        isLoading: props.isLoading,
        userInfo: props.userInfo
    }
}

export default connect(mapStateToPropsShort)(ProfilePage);
