import Block from "../../core/block.ts";
import InputField from "../input-field/input-field.ts";
import { Props } from "../../types.ts";


export default class ProfileForm extends Block {

    constructor(props: Props) {
        const formItems = props.formData.reduce((acc, current) => {
            const element = new InputField({className: current.className, title: current.title, name: current.name, type: current.type, label: current.label, blur: current.blur, enabled: props.formEnabled});
            acc[element.id] = element;
            return acc;
        }, {});

        super("form", {
            ...props,
            formItemsKeys: Object.keys(formItems),
            ...formItems
        })
    }


    render() {
        return (
                `
                    <ul class="profile-form">
                        ${this.props.formItemsKeys.map((key) => `{{{ ${key} }}}`).join('')}
                    </ul>
                `
        )
    }
}

