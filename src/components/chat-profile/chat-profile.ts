import Block from "../../core/block.ts";
import { switchPage } from "../../core/utils.ts";
import Image from "../image/image.ts";
import ProfileImage from "../profile-image/profile-image.ts";
import type { StoreType } from "../../types.ts";
import { connect } from "../../core/connect.ts";

type ChatProfileProps = object;

class ChatProfile extends Block<ChatProfileProps> {
    constructor(props: ChatProfileProps) {
        super({
            ...props
        });
    }

    init() {
        // const Cat = new Image({
        //     className: "chat-profile__user-image",
        //     src: "/assets/cat.jpg",
        //     alt: "Аватар пользователся",
        //     path: ""
        // });
        const Profile = new ProfileImage({
            className: "chat-profile__user-image",
            src: "/assets/profile-placeholder-small.png",
            alt: "Аватар пользователся",
            path: ""
        })
        const SettingsIcon = new Image({
            className: "chat-profile__settings-icon",
            src: "/assets/icons/settings.png",
            alt: "Аватар пользователся",
            page: "login",
            events: {
                click: switchPage
            },
            path: ""
        });

        this.children = {
            // Cat,
            SettingsIcon,
            Profile
        };
    }

    render() {
        return (
            `
                    <nav class="chat-profile">
                        <div class="chat-profile__user">
                            {{{ Profile }}}
                            <p class="chat-profile__user-name">Илья</p>
                        </div>
                        <div class="chat-profile__settings-button" page="{{ login }}">
                            {{{ SettingsIcon }}}
                        </div>
                    </nav>
                `
        );
    }
}

const mapStateToPropsShort = (props: StoreType): object => {
    return {
        avatar: props.userInfo.avatar,
        imageLink: props.imageLink
    }
}

export default connect(mapStateToPropsShort)(ChatProfile);
