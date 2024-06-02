import Block from "../../core/block.ts";

export default class InputElement extends Block {
    constructor(props) {
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
