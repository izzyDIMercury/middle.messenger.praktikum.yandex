import Block from "../../core/block.ts";


export default class Search extends Block {

    constructor(props) {
        super("form", {
            ...props
        })
    }


    render() {
        return (
                `
                    <form class="search">
                        <img class="search__icon" src="{{ searchIcon }}" alt="Иконка поиска">
                        <input class="search__input" type="text">
                    </form>                
                `
        )
    }
}
