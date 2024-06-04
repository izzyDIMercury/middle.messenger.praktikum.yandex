import Block from "../../core/block.ts";
import { Props } from "../../types.ts";

export default class InputElement extends Block {
    constructor(props: Props) {
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
