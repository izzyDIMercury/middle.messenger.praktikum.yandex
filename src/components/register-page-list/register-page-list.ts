import Block from "../../core/block.ts";
import InputField from "../input-field/input-field.ts";

type RegisterListData = {
    className: string,
    label: string,
    title: string,
    name: string,
    type: string,
    enabled?: boolean,
    blur: (event: FocusEvent) => void
}

type RegisterListProps = {
    list: Array<RegisterListData>,
    itemsKeys: string[]
}

export default class RegisterPageList extends Block<RegisterListProps> {
    constructor(props: RegisterListProps) {
        const items = props.list.reduce((acc: { [key: string]: InstanceType<typeof Block> }, current) => {
            const item = new InputField({
                className: current.className, title: current.title, name: current.name, type: current.type, blur: current.blur, label: current.label, enabled: true,
            });
            // console.log(item);
            acc[item.id] = item;

            return acc;
        }, {});

        // console.log(props);

        super("div", {
            ...props,
            itemsKeys: Object.keys(items),
            ...items,
        });
    }

    render() {
        const container = this.props as RegisterListProps;
        return (
            `
                <ul class="register-page__input-elements">
                    ${container.itemsKeys.map((key) => `{{{ ${key} }}}`).join("")}
                </ul>
            `
        );
    }
}
