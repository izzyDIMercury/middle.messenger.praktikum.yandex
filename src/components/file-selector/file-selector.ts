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
                <form id="myUserForm" class="avatar">
                    <label for="avatar" class="avatar__label">Выбрать файл</label>
                    <input id="avatar" type="file" name="avatar" accept="image/*">
                    <label for="avatar-submit" class="avatar-submit__label">Изменить картинку</label>
                    <input id="avatar-submit" type="submit">
                </form> 
            `
        );
    }
}
