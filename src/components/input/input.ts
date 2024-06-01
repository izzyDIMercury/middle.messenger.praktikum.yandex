import Block from "../../core/block.ts";

export default class Input extends Block {
    constructor(props) {
        super("div", {
            ...props,
            Field: new InputString({
                title: props.title,
                type: props.type,
                name: props.name,
                label: props.label,
                events: {
                    blur: props.blur
                }
            })
        })
    }

    render() {
        return (
            `
            <div class="input{{#if className}} {{className}} {{/if}}">
                {{{ Field }}}
            </div>
            `
        )
    }
}

class InputString extends Block {
    constructor(props) {
        super("", props)
    }

    render() {
        return (
            `
                <input 
                    class="input__element"
                    {{#if label}} id="{{label}}" {{/if}}
                    type="{{type}}" 
                    name="{{name}}" 
                    title="{{title}}" 
                    value="{{value}}"
                >
            `
        )
    }
}
