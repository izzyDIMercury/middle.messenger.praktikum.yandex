import Block from "../../core/block.ts";
import Input from "../input/input.ts";

export default class InputField extends Block {
    constructor(props) {
        super("div", {
            ...props,
            Input: new Input({
                className: "input-field__element",
                title: props.title,
                type: props.type,
                name: props.name,
                label: props.label,
                blur: props.blur
            })
        })
    }

    render() {
        return (
            `
                <li class="input-field{{#if className}} {{ className }} {{/if}} {{#if label}} {{className}}_{{label}} {{/if}}">
                    <label class="input-field__title">{{ title }}</label>
                    {{{ Input }}}
                </li>
            `
        )
    }
}

