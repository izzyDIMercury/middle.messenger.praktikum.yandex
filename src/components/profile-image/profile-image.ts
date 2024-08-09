import Block from "../../core/block.ts";
import Handlebars from "handlebars";
import { connect } from "../../core/connect.ts";
import { images } from "../../core/images.ts";
import type { StoreType } from "../../types.ts";
// import SettingsController from "../../controllers/settings.ts";
// import { GlobalStore } from "../../store.ts";
// import Chat from "../../controllers/chat.ts";

type ProfileImageProps = {
    className: string,
    src: string,
    alt?: string,
    path: string
};

class ProfileImage extends Block<ProfileImageProps> {

    // private host: string = "https://ya-praktikum.tech/api/v2/resources";

    constructor(props: ProfileImageProps) {
        const name = props.src.split(".").reverse()[1].split("/").reverse()[0];
        const path = images[name];
        Handlebars.registerHelper(name, () => path);

        super({
            ...props,
            path: path
        });

        // this.link = path;
    }

    // init() {
    //     const controller = new Chat();
    //     controller.setGlobalUserInfo();
    // }

    // componentDidMount(): void {
    //     // setTimeout(() => {
    //     //     console.log(GlobalStore.getState())
    //     // })
    //     console.log(GlobalStore.getState().userInfo.avatar)
    //     const link = "https://ya-praktikum.tech/api/v2/resources" + GlobalStore.getState().userInfo.avatar;
    //     this.link = link;
    // }
    
    // componentDidMount(): void {
    //     if (typeof this.hasAvatar !== "boolean") {
    //         this.checkAvatar();
    //     }
    // }

    // componentDidUpdate(): void {
    //     if (typeof this.hasAvatar !== "boolean") {
    //         this.checkAvatar();
    //     }
    // }

    // async checkAvatar() {
    //     console.log("AVATAR", this.props.imageLink)
    //     const controller = new SettingsController();
    //     const response = await controller.getUserInfo() as unknown as { response: string };
    //     const data = JSON.parse(response.response);
    //     if (data.avatar === null) {
    //         this.hasAvatar = false;
    //     } else {
    //         this.hasAvatar = true;
    //     }
    // }

    // init() {
    //     const controller = new SettingsController();
    //     const response = 
    //     if (this.props.imageLink === )
    //     console.log(this.props);
    // }

    render() {
        return (
            `    
                <img class={{ className }} src="{{#if avatar}} {{{imageLink}}} {{else}} {{path}} {{/if}}" alt="{{ alt }}" {{#if page}} page="{{ page }}" {{/if}}">
                                            
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

// avatar: props.userInfo.avatar,

export default connect(mapStateToPropsShort)(ProfileImage);

// <img class={{ className }} src="{{#if ${this.hasAvatar}}} {{{ imageLink }}} {{else}} {{{ path }}} {{/if}}" alt="{{ alt }}" {{#if page}} page="{{ page }}" {{/if}}">


// imageLink: props.imageLink
