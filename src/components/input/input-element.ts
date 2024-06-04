import Block from "../../core/block.ts";
import { Props } from "../../types.ts";

type InputElementProps = {
    title: string,
    type: string,
    name: string,
    label: string,
    enabled: boolean,
    events: {
        [key: string]: () => void
    }
}

export default class InputElement extends Block {
    constructor(props: InputElementProps) {
        super("", props)
    }

    render() {
        return (
            `
                {{#if enabled}}
                <input 
                    class="input__element"
                    type="{{type}}" 
                    name="{{name}}" 
                    title="{{title}}" 
                    value="{{value}}"
                >
                {{else}}
                <div></div>
                {{/if}}
            `
        )
    }
}
