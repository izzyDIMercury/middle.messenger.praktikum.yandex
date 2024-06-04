import Block from "../../core/block.ts";
import Image from "../image/image.ts";
import { Props } from "../../types.ts";


export default class Search extends Block {

    constructor(props: Props) {
        super("form", {
            ...props
        })
    }

    init() {
        const SearchIcon = new Image({
            className: "search__icon",
            src: "/assets/icons/search.png",
            alt: "Иконка поиска"
        })

        this.children = {
            SearchIcon
        }
    }


    render() {
        return (
                `
                    <form class="search">
                        {{{ SearchIcon }}}
                        <input class="search__input" type="text">
                    </form>                
                `
        )
    }
}
