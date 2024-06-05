import Block from "../../core/block.ts";
import Image from "../image/image.ts";

type UserProps = {
    name: string,
    message: string,
    unread: string,
    time: string,
    selected: string,
    image: string
}

export default class User extends Block<UserProps> {
    constructor(props: UserProps) {
        super("form", {
            ...props,
        });
    }

    init() {
        const userData = this.props as UserProps;
        const UserImagePlaceholder = new Image({
            className: "user__image",
            src: userData.image,
            alt: "Фото пользователя",
        });

        this.children = {
            UserImagePlaceholder,
        };
    }

    render() {
        return (
            `
                    <li class="user {{#if selected}} {{ selected }} {{/if}}">
                        <div class="user__content">
                            {{{ UserImagePlaceholder }}}
                            <div class="user__data">
                                <p class="user__name">{{ name }}</p>
                                <p class="user__message">{{ message }} </p>
                            </div>
                        </div>
                        <div class="user__status">
                            <p class="user__message-time">{{ time }} </p>
                            {{#if unread }}
                            <div class="user__unread">
                                <p class="user__unread-number">{{ unread }}</p>
                            </div>
                            {{/if}}
                        </div>
                    </li>            
                `
        );
    }
}
