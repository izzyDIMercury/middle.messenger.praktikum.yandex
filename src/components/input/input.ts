import Block from "../../core/block.ts";
import InputElement from "./input-element.ts";

type InputProps = {
    className?: string,
    title: string,
    type: string,
    name: string,
    label: string,
    enabled: boolean,
    blur: (event: FocusEvent) => void,
    Field?: InstanceType<typeof Block>
} 

export default class Input extends Block<InputProps> {

    constructor(props: InputProps) {
        super({
            ...props
        });
    }

    init() {
        const addFocusAttributeBind = this.addFocusAttribute.bind(this);

        const { title, type, name, label, enabled, blur } = this.props as InputProps;

        const Field = new InputElement({
            title: title,
            type: type,
            name: name,
            label: label,
            enabled: enabled,
            was_focused: false,
            events: {
                blur: blur,
                focus: addFocusAttributeBind
            }
        })

        this.children = {
            Field
        }
    }

    addFocusAttribute(event: FocusEvent) {
        const element = event.target as unknown as HTMLElement;
        element.setAttribute("was_focused", "true");
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

// Field: new InputElement({
//     title: props.title,
//     type: props.type,
//     name: props.name,
//     label: props.label,
//     enabled: props.enabled,
//     events: {
//         blur: props.blur
//         focus: 
//     }
// })
