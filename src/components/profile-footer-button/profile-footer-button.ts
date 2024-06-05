import Block from "../../core/block.ts";
import Link from "../link/link.ts";

// type ProfileFooterButtonProps = {
//     classModifier?: string,
//     page?: string,
//     text: string,
//     events: {
//         click: Function
//     }
// }

type ProfileFooterButtonProps = {
    [key: string]: string | number | { click: Function };
}

export default class ProfileFooterButton extends Block<ProfileFooterButtonProps> {

    constructor(props: ProfileFooterButtonProps) {

        super("form", {
            ...props
        })
        // console.log(props);
    }

    init() {
        const FooterLink = new Link({
            className: "profile-footer-button__button",
            page: this.props.page,
            text: this.props.text
        });

        this.children = {
            FooterLink
        }
    }

    render() {
        return (
                `
                    <div class="profile-footer-button{{#if classModifier}} {{classModifier}}{{/if}}">
                        {{{ FooterLink }}}
                    </div>
                `
        )
    }
}
