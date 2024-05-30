import Block from "../../core/block.ts";

export default class Input extends Block {
    constructor(props) {
        super("div", {
            ...props
        })
    }

    render() {
        return (
            `
            <div class="input{{#if className}} {{className}} {{/if}}">
                <input 
                    class="input__element" 
                    type="{{type}}" 
                    name="{{name}}" 
                    title="{{title}}" 
                    value="{{value}}"
                >
            </div>
            `
        )
    }
}
