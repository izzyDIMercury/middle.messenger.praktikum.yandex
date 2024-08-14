import Block from "../../core/block.ts";
import Image from "../image/image.ts";
import { searchUsers } from "../../core/utils.ts";
import DropDown from "../drop-down/drop-down.ts";

type SearchProps = {};

export class Search extends Block<SearchProps> {

    public users: object[] = [];
    public usersKeys: string[] = [];

    constructor(props: SearchProps) {
        super({
            ...props
        });
    }

    init() {
        const SearchIcon = new Image({
            className: "search__icon",
            src: "/assets/icons/search.png",
            alt: "Иконка поиска",
            path: ""
        });

        const searchUsersBind = searchUsers.bind(this);
        const handleBlurBind = this.handleBlur.bind(this);

        const Input = new SearchField({
            events: {
                input: searchUsersBind,
                blur: handleBlurBind
            }
        });
        const UsersList = new DropDown({
            users: []
        });

        this.children = {
            SearchIcon,
            Input,
            UsersList
        };
    }

    handleBlur(event: FocusEvent) {
        event.preventDefault();
        const root = document.querySelector(".found-users__list") as HTMLElement;
        root.textContent = "";
    }

    render() {
        return (
            `
                    <form class="search">
                        {{{ SearchIcon }}}
                        {{{ Input }}}
                        {{{ UsersList }}}
                    </form>                
                `
        );
    }
}


type SearchFieldProps = {};

class SearchField extends Block<SearchFieldProps> {
    constructor(props: SearchFieldProps) {
        super({
            ...props
        });
    }


    render() {
        return (
            `
                <input class="search__input" type="text"></input>
            `
        )
    }
}

type UserInSearchProps = {};

export class UserInSearch extends Block<UserInSearchProps> {
    constructor(props: UserInSearchProps) {
        super({
            ...props
        })
    }

    render() {
        return (
            `
                <li class="users-dropdown-list">hello</li>
            `
        )
    }
}
