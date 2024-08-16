import Block from "../../core/block.ts";
import Image from "../image/image.ts";
// import { connect } from "../../core/connect.ts";
// import type { StoreType } from "../../types.ts";

type UserProps = {
    lastMessage: string,
    avatar: string | undefined,
    title: string,
    chatId: number,
    events: {
        click: (event: MouseEvent) => void
    }
}

export default class User extends Block<UserProps> {
    constructor(props: UserProps) {
        super({
            ...props
        });
    }

    init() {
        // console.log(this.props.avatar)
        const props = this.props as { avatar: string };
        const Avatar = new Image({
            className: "user__image",
            src: "/assets/icons/profile-placeholder-small.png",
            avatar: props.avatar,
            alt: "Аватар пользователя"
        });

        this.children = {
            Avatar
        }
    }

    render() {
        return (
            `
                    <li chatId={{ chatId }} class="user {{#if selected}} {{ selected }} {{/if}}">
                        <div class="user__content">
                            {{{ Avatar }}}
                            <div class="user__data">
                                <p class="user__name">{{ title}}</p>
                                <p class="user__message">{{ lastMessage }} </p>
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


// const mapStateToPropsShort = (props: StoreType): object => {
//     return {
//         length: props.length
//     }
// }

// export default connect(mapStateToPropsShort)(User);

// return {
//     chats: props.chats,
//     length: props.length,
//     defaultChatSelected: props.defaultChatSelected
// }
