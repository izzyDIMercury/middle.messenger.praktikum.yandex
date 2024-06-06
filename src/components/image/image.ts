import Block from "../../core/block.ts";

type ImageProps = {
    className: string,
    src: string,
    alt?: string,
    page?: string,
    events?: {
        click: Function
    }
};

export default class Image extends Block<ImageProps> {
    constructor(props: ImageProps) {
        super({
            ...props
        });
    }

    render() {
        return (
            `   
                    <img class={{ className }} src="{{ src }}" alt="{{ alt }}" {{#if page}} page="{{ page }}" {{/if}}">
                            
                `
        );
    }
}
