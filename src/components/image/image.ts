import Block from "../../core/block.ts";

export default class Image extends Block {

    constructor(props) {
        super("", {
            ...props
        })
        console.log(this.props.page);
    }


    render() {
        return (
                `   
                    <img class={{ className }} src="{{ src }}" alt="{{ alt }}" {{#if page}} page="{{ page }}" {{/if}}">
                            
                `
        )
    }
}
