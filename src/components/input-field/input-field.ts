import Block from "../../core/block.ts";
import Input from "../input/input.ts";

type InputFieldProps = {
    className: string,
    title: string,
    type: string,
    name: string,
    label: string,
    enabled: boolean,
    blur: (event: FocusEvent) => void,
    InputBlock?: InstanceType<typeof Block>
};

export default class InputField extends Block<InputFieldProps> {
    // propsData: InputFieldProps

    constructor(props: InputFieldProps) {
        super("div", {
            ...props,
            InputBlock: new Input({
                className: props.className,
                title: props.title,
                type: props.type,
                name: props.name,
                label: props.label,
                blur: props.blur,
                enabled: props.enabled,
            }),
        });
    }

    render() {
        return (
            `
                <li class="input-field{{#if className}} {{ className }} {{/if}} {{#if label}} {{className}}_{{label}} {{/if}}">
                    <label class="input-field__title">{{ title }}</label>
                    {{{ InputBlock }}}
                </li>
            `
        );
    }
}
