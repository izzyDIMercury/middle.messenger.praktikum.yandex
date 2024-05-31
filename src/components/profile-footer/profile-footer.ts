import Block from "../../core/block.ts";
import ProfileFooterButton from "../profile-footer-button/profile-footer-button.ts";


export default class ProfileFooter extends Block {

    constructor(props) {

        const buttons = props.buttons.reduce((acc, current) => {
            const button = new ProfileFooterButton({classModifier: current.classModifier, page: current.page, text: current.text});
            acc[button.id] = button;
            return acc;
        }, {});

        super("div", {
            ...props,
            buttonsKeys: Object.keys(buttons),
            ...buttons
        })
    }


    render() {
        return (
                `
                <div class="profile-footer">
                    ${this.props.buttonsKeys.map((key) => `{{{ ${key} }}}`).join('')}
                </div>
                `
        )
    }
}
