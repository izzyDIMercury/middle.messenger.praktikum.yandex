import Block from "../../core/block.ts";
import ProfileFooterButton from "../profile-footer-button/profile-footer-button.ts";
import { switchPage } from "../../core/utils.ts";

type ProfileData = {
    classModifier: string,
    page: string,
    text: string,
    events: {
        switchPage: Function
    }
}

type ProfileFooterProps = {
    buttons: Array<ProfileData>,
}



export default class ProfileFooter extends Block<ProfileFooterProps> {

    constructor(props: ProfileFooterProps) {

        const buttons = props.buttons.reduce((acc, current) => {
            const button = new ProfileFooterButton({classModifier: current.classModifier, page: current.page, text: current.text, events: { click: switchPage }});
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
