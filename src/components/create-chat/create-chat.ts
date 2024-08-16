import Block from "../../core/block.ts";
import Chat from "../../controllers/chat.ts";

type CreateChatProps = {};
type ButtonProps = {
    events: {
        click: Function
    }
};

export default class CreateChat extends Block<CreateChatProps> {
    constructor(props: CreateChatProps) {
        super({
            ...props
        })
    }

    init() {
        const createChatBind = this.createChat.bind(this);
        const Confirm = new Button({
            events: {
                click: createChatBind
            }
        })
        this.children = {
            Confirm
        }
    }

    createChat(event: MouseEvent) {
        event.preventDefault();
        const input = document.querySelector(".create-chat__input") as HTMLInputElement;
        const value = input.value;
        const controller = new Chat();
        controller.createChat(value);
        // console.log(value);
    }

    render() {
        return (
            `
                <div class="create-chat">
                    <input class="create-chat__input" type="text" maxlength="16" />
                    {{{ Confirm }}}
                </div>
            `
        )
    }
}

class Button extends Block<ButtonProps> {
    constructor(props: ButtonProps) {
        super({
            ...props
        })
    }

    render() {
        return (
            `
                <button class="create-chat__button">Создать чат</button>
            `
        )
    }
} 
