import Block from "../../core/block.ts";
import { Props } from "../../types.ts";

export default class Image extends Block {

    constructor(props: Props) {
        super("", {
            ...props
        })
    }


    render() {
        return (
                `   
                    <img class={{ className }} src="{{ src }}" alt="{{ alt }}" {{#if page}} page="{{ page }}" {{/if}}">
                            
                `
        )
    }
}
