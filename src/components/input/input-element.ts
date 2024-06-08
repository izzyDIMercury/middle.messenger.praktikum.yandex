import Block from "../../core/block.ts";

export type InputElementProps = {
    title: string,
    type: string,
    name: string,
    label: string,
    enabled: boolean,
    was_focused: boolean,
    events: {
        [key: string]: (event: FocusEvent) => void
    }
};

export default class InputElement extends Block<InputElementProps> {
    constructor(props: InputElementProps) {
        super(props);
    }

    render() {
        return (
            `
                {{#if enabled}}
                <input
                    id={{label}}
                    class="input__element"
                    type="{{type}}" 
                    name="{{name}}" 
                    title="{{title}}" 
                    value="{{value}}"
                    was_focused="{{was_focused}}"
                >
                {{else}}
                <div></div>
                {{/if}}
            `
        );
    }
}
