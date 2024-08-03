import Block from "../../core/block.ts";
import PageTitle from "../../components/page-title/page-title.ts";
import ReturnButton from "../../components/return-button/return-button.ts";
import ProfileFooter from "../../components/profile-footer/profile-footer.ts";
import ProfileForm from "../../components/profile-form/profile-form.ts";
import Image from "../../components/image/image.ts";
import { switchPage } from "../../core/utils.ts";
import { connect } from "../../core/connect.ts";
import SettingsController from "../../controllers/settings.ts";
import FileSelector from "../../components/file-selector/file-selector.ts";

type ProfilePageProps = {};

class ProfilePage extends Block<ProfilePageProps> {

    private imageLink: string = "";

    constructor(props: ProfilePageProps) {
        super({
            ...props
        });
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

        const handleFileBind = this.handleFile.bind(this);
        const File = new FileSelector({
            events: {
                submit: handleFileBind
            }
        })

        this.children = {
            Title,
            ButtonBack,
            ProfileImage,
            Footer,
            Form,
            File
        };
    }

    componentDidMount(): void {
        const controller = new SettingsController();
        controller.getUserInfo();

        async function handleUserInfo() {
            const controller = new SettingsController();
            const response = await controller.getUserInfo();
            const result = JSON.parse(response.response);
            const title = document.querySelector(".profile-page__title") as HTMLTitleElement;
            title.textContent = Object.entries(result).filter((prop) => prop[0] === "login")[0][1] as string;
            Object.entries(result).forEach(([key, value]) => {
                const element = document.querySelector(`p[name=${key}]`) as HTMLTitleElement;
                if (element !== null) {
                    element.textContent = value as string;
                }
            })
            const image = Object.entries(result).filter((prop) => prop[0] === "avatar")[0][1];
            const imageLink = "https://ya-praktikum.tech/api/v2/resources/" + image;
            window.store.setState({ imageLink })
        }

        handleUserInfo();
    }

    handleFile(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const controller = new SettingsController();
        controller.setAvatar(form);
    }

    handleBlur(event: FocusEvent) {
        return event;
    }

    handleLogout() {
        console.log("LOGOUT");
        const controller = new SettingsController();
        controller.logout();
    }

    render() {
        return (
            `
                    <main class="profile-page">
                        {{{ ButtonBack }}}
                        <div class="profile-page__content">
                            {{{ File }}}
                            <form class="profile-page__form">
                                {{{ ProfileImage }}}
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

const mapStateToPropsShort = ({ isLoading, imageLink }): object => {
    return { isLoading, imageLink }
}

export default connect(mapStateToPropsShort)(ProfilePage);
