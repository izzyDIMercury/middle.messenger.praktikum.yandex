import Block from "../../core/block.ts";
import Image from "../image/image.ts";
import { Props } from "../../types.ts";

export default class ProfileButton extends Block {

    constructor(props: Props) {
        super("form", {
            ...props
        })
    }

    init() {
        const ProfileButtonIcon = new Image({
            className: "profile-button__icon",
            src: "/assets/icons/profile.png",
            alt: "Профиль",
            page: "profile"
        });

        this.children = {
            ProfileButtonIcon
        }
    }


    render() {
        return (
                `
                    <div class="profile-button" page="profile">
                        {{{ ProfileButtonIcon }}}
                    </div>            
                `
        )
    }
}
