import Block from "../../core/block.ts";

export default class Image extends Block {

    constructor(props) {
        super("", {
            ...props
        })
    }


    render() {
        return (
                `   
                    <img class={{ className }} src="{{ src }}" alt="{{ alt }}" {{#if props.page}} page="{{ page }} {{/if}}">
                            
                `
        )
    }
}
