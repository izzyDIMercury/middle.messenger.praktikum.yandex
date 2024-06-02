import Block from "../../core/block.ts";
import InputField from "../input-field/input-field.ts";

export default class RegisterPageList extends Block {

    constructor(props) {
        const items = props.list.reduce((acc, current) => {
            const item = new InputField({className: current.className, title: current.title, name: current.name, type: current.type, blur: current.blur, enabled: true});
            // console.log(item);
            acc[item.id] = item;

            return acc;
        }, {});

        super("div", {
            ...props,
            itemsKeys: Object.keys(items),
            ...items
        })
    }

    render() {
        return (
            `
                <ul class="register-page__input-elements">
                    ${this.props.itemsKeys.map((key) => `{{{ ${key} }}}`).join('')}
                </ul>
            `
        )
    }
}
