import Block from "../../core/block.ts";
import InputElement from "./input-element.ts";
import { Props } from "../../types.ts";

type InputProps = {
    className: string,
    title: string,
    type: string,
    name: string,
    label: string,
    enabled: boolean,
    blur: (event: FocusEvent) => void
}

export default class Input extends Block {
    constructor(props: InputProps) {
        super("div", {
            ...props
        });
    };

    init() {
        const Field = new InputElement({
            title: this.props.title,
            type: this.props.type,
            name: this.props.name,
            label: this.props.label,
            enabled: this.props.enabled,
            events: {
                blur: this.props.blur
            }
        });

        this.children = {
            Field
        }
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

// Field: new InputElement({
//     title: props.title,
//     type: props.type,
//     name: props.name,
//     label: props.label,
//     enabled: props.enabled,
//     events: {
//         blur: props.blur
//     }
// })
