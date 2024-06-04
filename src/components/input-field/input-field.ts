import Block from "../../core/block.ts";
import Input from "../input/input.ts";
import { Props } from "../../types.ts";

type InputFieldProps = {
    className: string,
    title: string,
    type: string,
    name: string,
    label: string,
    enabled: boolean,
    blur: (event: FocusEvent) => void
}

export default class InputField extends Block {
    constructor(props: InputFieldProps) {
        super("div", {
            ...props
        })
    }

    init() {
        const InputBlock = new Input({
            className: "input-field__element",
            title: this.props.title,
            type: this.props.type,
            name: this.props.name,
            label: this.props.label,
            blur: this.props.blur,
            enabled: this.props.enabled
        })

        this.children = {
            InputBlock
        }
    }

    render() {
        return (
            `
                <li class="input-field{{#if className}} {{ className }} {{/if}} {{#if label}} {{className}}_{{label}} {{/if}}">
                    <label class="input-field__title">{{ title }}</label>
                    {{{ InputBlock }}}
                </li>
            `
        )
    }
}

