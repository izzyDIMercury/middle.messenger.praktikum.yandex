import Block from "../../core/block.ts";
import Image from "../image/image.ts";
import { connect } from "../../core/connect.ts";
import { searchUsers } from "../../core/utils.ts";

type SearchProps = {};

class Search extends Block<SearchProps> {

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
        const Input = new SearchField({
            events: {
                input: searchUsersBind
            }
        });

        const UserField = new User({});

        this.children = {
            SearchIcon,
            Input,
            UserField
        };
    }

    // componentDidUpdate(): boolean {
    //     let users;
    //     if (this.props.usersList.length !== 0) {
    //         users = this.props.usersList.reduce((acc: { [key: string]: InstanceType<typeof Block> }, current) => {
    //             const user = new User({
    //                 name: current.first_name
    //             });
    //             acc[user.id] = user;
    //             return acc;
    //         }, {});
    //     }
    //     this.users = users;
    //     console.log(this.props.usersFound);
    //     this.usersKeys = users && Object.keys(users);     
    // }

    render() {
        console.log("RENDER");
        return (
            `
                    <form class="search">
                        {{{ SearchIcon }}}
                        {{{ Input }}}
                        <ul class="users-dropdown-list">
                            {{#if isLoading}}
                                {{{ UserField }}}
                            {{/if }}                           
                        </ul>
                    </form>                
                `
        );
    }
}

// ${this.usersKeys.map((key) => `{{{ ${key} }}}`).join("")}


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

type UserProps = {};

class User extends Block<UserProps> {

    constructor(props: UserProps) {
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

// <ul class="left-column__users">
//     ${container.usersKeys.map((key) => `{{{ ${key} }}}`).join("")}
// </ul>

// const mapStateToPropsShort = ({ searchUsers }): object => {
//     return {
//         searchInput: searchUsers.searchInput,
//         usersList: searchUsers.usersList,
//         usersFound: searchUsers.usersFound
//     }
// }

const mapStateToPropsShort = ({ isLoading }): object => {
    return { isLoading }
}

export default connect(mapStateToPropsShort)(Search);
