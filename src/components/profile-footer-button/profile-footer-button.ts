import Block from "../../core/block.ts";
import Link from "../link/link.ts";
import { switchPage } from "../../core/utils.ts";

type ProfileFooterButtonProps = {
    classModifier?: string,
    page: string,
    text: string,
    events: {
        click: Function
    }
}

export default class ProfileFooterButton extends Block<ProfileFooterButtonProps> {
    constructor(props: ProfileFooterButtonProps) {
        super({
            ...props
        });
    }

    init() {
        const exprectedProps = this.props as ProfileFooterButtonProps;
        const FooterLink = new Link({
            className: "profile-footer-button__button",
            page: exprectedProps.page,
            text: exprectedProps.text,
            events: {
                click: switchPage
            }
        });

        this.children = {
            FooterLink
        };
    }

    render() {
        return (
            `
                    <div class="profile-footer-button{{#if classModifier}} {{classModifier}}{{/if}}">
                        {{{ FooterLink }}}
                    </div>
                `
        );
    }
}
