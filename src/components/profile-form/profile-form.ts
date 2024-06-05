import Block from "../../core/block.ts";
import InputField from "../input-field/input-field.ts";
// import { Props } from "../../types.ts";

type ProfileFormData = {
    className: string,
    title: string,
    name: string,
    type: string,
    label: string,
    blur: (event: FocusEvent) => void
}

type ProfileFormProps = {
    formEnabled: boolean,
    formData: Array<ProfileFormData>,
    formItemsKeys: string[]
}

export default class ProfileForm extends Block<ProfileFormProps> {
    constructor(props: ProfileFormProps) {
        const formItems = props.formData.reduce((acc: { [key: string]: InstanceType<typeof Block> }, current) => {
            const element = new InputField({
                className: current.className, title: current.title, name: current.name, type: current.type, label: current.label, blur: current.blur, enabled: props.formEnabled,
            });
            acc[element.id] = element;
            return acc;
        }, {});

        super("form", {
            ...props,
            formItemsKeys: Object.keys(formItems),
            ...formItems,
        });
    }

    render() {
        const container = this.props as ProfileFormProps;
        return (
            `
                    <ul class="profile-form">
                        ${container.formItemsKeys.map((key) => `{{{ ${key} }}}`).join("")}
                    </ul>
                `
        );
    }
}
