import Block from "../../core/block.ts";
import Handlebars from "handlebars";
import { images } from "../../core/images.ts";

type ImageProps = {
    className: string,
    src: string,
    alt?: string,
    page?: string,
    events?: {
        click: Function
    },
    path: string
};

export default class Image extends Block<ImageProps> {
    constructor(props: ImageProps) {

        const name = props.src.split(".").reverse()[1].split("/").reverse()[0];
        const path = images[name];
        Handlebars.registerHelper(name, () => path);

        super({
            ...props,
            path: path
        });
    }

    render() {
        return (
            `    
                <img class={{ className }} src="{{{ path }}}" alt="{{ alt }}" {{#if page}} page="{{ page }}" {{/if}}">
                                            
                ` 
        );
    }
}

// <img class={{ className }} src="{{ src }}" alt="{{ alt }}" {{#if page}} page="{{ page }}" {{/if}}">
