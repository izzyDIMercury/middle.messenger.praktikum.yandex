import Block from "../../core/block.ts";
import Link from "../link/link.ts";
import { Props } from "../../types.ts";



export default class ProfileFooterButton extends Block {

    constructor(props: Props) {

        super("form", {
            ...props
        })
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
