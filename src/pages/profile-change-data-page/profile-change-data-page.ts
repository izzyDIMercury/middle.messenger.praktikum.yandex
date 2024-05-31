import Block from "../../core/block.ts";
import ReturnButton from "../../components/return-button/return-button.ts";
import ProfileForm from "../../components/profile-form/profile-form.ts";
import Button from "../../components/button/button.ts";
import Image from "../../components/image/image.ts";


export default class ProfileChangeDataPage extends Block {

    constructor(props) {
        super("form", {
            ...props
        })
    }

    init() {
        const ButtonBack = new ReturnButton();
        const Form = new ProfileForm({
            data: true
        });
        const ProfileButton = new Button({
            className: "profile-change-data-page",
            page: "profile",
            text: "Сохранить",
        });
        const ProfileImage = new Image({
            className: "profile-change-data-page__image",
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


    render() {
        return (
                `
                    <main class="profile-page">
                        {{{ ButtonBack }}}
                        <div class="profile-page__content">
                            <form class="profile-change-data-page__form">
                                {{{ ProfileImage }}}
                                {{{ Form }}}
                                {{{ ProfileButton }}}
                            </form>
                        </div>
                    </main>
                `
        )
    }
}
