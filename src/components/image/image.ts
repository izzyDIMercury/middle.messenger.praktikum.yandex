import Block from "../../core/block.ts";
import Handlebars from "handlebars";
import { connect } from "../../core/connect.ts";
import { images } from "../../core/images.ts";

import type { StoreType } from "../../types.ts";


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

class Image extends Block<ImageProps> {
    constructor(props: ImageProps) {

        const name = props.src.split(".").reverse()[1].split("/").reverse()[0];
        console.log(props);
        const path = images[name];
        // const avatar = props.avatar;
        Handlebars.registerHelper(name, () => path);

        super({
            ...props,
            path: path
        });

        // console.log(this.props);
    }

    render() {
        return (
            `    
                <img class={{ className }} src="{{#if avatar}} {{{avatar}}} {{else}} {{{ path }}} {{/if}}" alt="{{ alt }}" {{#if page}} page="{{ page }}" {{/if}}">
                                            
                ` 
        );
    }
}

const mapStateToPropsShort = (props: StoreType): object => {
    return {
        imageLink: props.imageLink
    }
}

// {{#if avatar}} {{{avatar}}} {{else}} {{{ path }}} {{/if}}

export default connect(mapStateToPropsShort)(Image);

