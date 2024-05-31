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
                    <img src="{{ src }}" alt="{{ alt }}" page="{{ page }}">
                            
                `
        )
    }
}
