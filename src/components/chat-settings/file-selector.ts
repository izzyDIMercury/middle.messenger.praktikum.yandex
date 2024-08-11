import Block from "../../core/block.ts";

type FileSelectorProps = {
    events: {
        submit: Function
    }
};

export default class FileSelector extends Block<FileSelectorProps> {
    constructor(props: FileSelectorProps) {
        super({
            ...props
        });
    }

    render() {
        return (`
                <form id="chatForm" class="chat-image">
                    <label for="chat-image" class="chat-image__label">Выбрать файл</label>
                    <input id="chat-image" type="file" name="avatar" accept="image/*">
                    <label for="chat-image-submit" class="chat-image-submit__label">Изменить картинку</label>
                    <input id="chat-image-submit" type="submit">
                    <input id="chatId" name="chatId" type="number" value="20379">
                </form> 
            `
        );
    }
}
