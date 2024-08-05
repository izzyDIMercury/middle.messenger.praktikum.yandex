import Block from "../../core/block.ts";
// import Image from "../image/image.ts";
import { connect } from "../../core/connect.ts";
import type { StoreType } from "../../types.ts";

type UserProps = {
    name: string,
    message: string,
    unread: string,
    time: string,
    selected: string,
    image: string
}

class User extends Block<UserProps> {
    constructor(props: UserProps) {
        super({
            ...props
        });
    }

    render() {
        return (
            `
                    <li chatId={{ chatId }} class="user {{#if selected}} {{ selected }} {{/if}}">
                        <div class="user__content">
                            {{{ UserImagePlaceholder }}}
                            <div class="user__data">
                                <p class="user__name">{{ first_name }} {{ second_name }}</p>
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


const mapStateToPropsShort = (props: StoreType): object => {
    return {
        chats: props.chats,
        length: props.length
    }
}

export default connect(mapStateToPropsShort)(User);
