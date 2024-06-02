import Block from "../../core/block.ts";
import InputElement from "./input-element.ts";

export default class Input extends Block {
    constructor(props) {
        super("div", {
            ...props,
            Field: new InputElement({
                title: props.title,
                type: props.type,
                name: props.name,
                label: props.label,
                enabled: props.enabled,
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

