import Block from "../../core/block.ts";
import ProfileFooterButton from "../profile-footer-button/profile-footer-button.ts";
import { switchPage } from "../../core/utils.ts";

type ProfileData = {
    classModifier: string,
    page: string,
    text: string,
    switchPage: Function | null
};


type ProfileFooterProps = {
    buttons: Array<ProfileData>,
    buttonsKeys: string[]
};


export default class ProfileFooter extends Block<ProfileFooterProps> {
    constructor(props: ProfileFooterProps) {
        const buttons = props.buttons.reduce((acc: { [key: string]: InstanceType<typeof Block> }, current) => {
            const button = new ProfileFooterButton({
                classModifier: current.classModifier, page: current.page, text: current.text, events: { click: switchPage },
            });
            acc[button.id] = button;
            return acc;
        }, {});

        super("div", {
            ...props,
            buttonsKeys: Object.keys(buttons),
            ...buttons,
        });
    }

    render() {
        const container = this.props as ProfileFooterProps;
        return (
            `
                <div class="profile-footer">
                    ${container.buttonsKeys.map((key) => `{{{ ${key} }}}`).join("")}
                </div>
                `
        );
    }
}

