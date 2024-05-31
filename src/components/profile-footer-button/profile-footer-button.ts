import Block from "../../core/block.ts";
import Link from "../link/link.ts";



export default class ProfileFooterButton extends Block {

    constructor(props) {

        super("form", {
            ...props
        })
    }

    init() {
        const FooterLink = new Link({
            className: "profile-footer-button__button",
            title: "chat",
            text: "Назад"
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
