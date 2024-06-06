import Block from "../../core/block.ts";
import InputElement from "./input-element.ts";

type InputProps = {
    className: string,
    title: string,
    type: string,
    name: string,
    label: string,
    enabled: boolean,
    blur: (event: FocusEvent) => void,
    Field?: InstanceType<typeof Block>
} 

export default class Input extends Block<InputProps> {
    // propsInput: InputProps

    constructor(props: InputProps) {
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
        });
    }

    render() {
        return (
            `
            <div class="input{{#if className}} {{className}} {{/if}}">
                {{{ Field }}}
            </div>
            `
        );
    }
}
