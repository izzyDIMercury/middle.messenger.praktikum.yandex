import Block from "../../core/block.ts";
import InputField from "../input-field/input-field.ts";


export default class ProfileForm extends Block {

    constructor(props) {
        const data = [
            {
                id: 1,
                className: "profile-form__input",
                title: "Почта",
                name: "email",
                type: "email"
            },
            {
                id: 2,
                className: "profile-form__input",
                title: "Логин",
                name: "login",
                type: "text"
            },
            {
                id: 3,
                className: "profile-form__input",
                title: "Имя",
                name: "first_name",
                type: "text"
            }
        ]
        const inputFields = data.reduce((acc, current) => {
            const element = new InputField({className: current.className, title: current.title, name: current.name, type: current.type});
            acc[element.id] = element;
            return acc;
        }, {});

        super("form", {
            ...props,
            inputFieldsKeys: Object.keys(inputFields),
            ...inputFields
        })
    }

    // init() {
    //     const ProfileInputArray = this.props.profileFormItems.map(element => {
    //         const component = new InputField({
    //             id: element.id,
    //             className: element.className,
    //             title: element.title,
    //             name: element.name,
    //             type: element.type
    //         })
    //         return component;
    //     })
    // }


    render() {
        return (
                `
                    <ul class="profile-form">
                        ${this.props.inputFieldsKeys.map((key) => `{{{ ${key} }}}`).join('')}
                    </ul>
                `
        )
    }
}

// <ul class="profile-form">
//     {{#if data }}
//         {{#each (profile-form-items)}}
//             {{{ ProfileInput }}}
//         {{/each}}
//     {{else}}
//         {{#each (profile-password-items)}}
//             {{{ ProfileInput }}}
//         {{/each}}
//     {{/if}}
// </ul>
