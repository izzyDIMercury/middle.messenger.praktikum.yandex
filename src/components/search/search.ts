import Block from "../../core/block.ts";
import Image from "../image/image.ts";

type SearchProps = {};

export default class Search extends Block<SearchProps> {
    constructor(props: SearchProps) {
        super({
            ...props
        });
    }

    init() {
        const SearchIcon = new Image({
            className: "search__icon",
            src: "/assets/icons/search.png",
            alt: "Иконка поиска"
        });

        this.children = {
            SearchIcon
        };
    }

    render() {
        return (
            `
                    <form class="search">
                        {{{ SearchIcon }}}
                        <input class="search__input" type="text">
                    </form>                
                `
        );
    }
}
