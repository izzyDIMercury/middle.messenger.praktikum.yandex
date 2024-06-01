export default class FormSubmit {
    constructor(props) {
        const result = props.map(element => {
            if (element.name === "login") {
                return this.checkLogin(element.value);
            } else if (element.name === "password") {
                // console.log(element.value);
                return this.checkPassword(element.value);
            }
        });
        console.log(result);
    }

    private checkLogin(login): boolean {
        console.log("works");

        if (login.length < 3 || login.length > 20) {
            throw new Error("Длина логина должна быть не менее 3 и не более 20 символов");
        }

        if (!login.match(/^[\w-]+$/)) {
            throw new Error("Допускаются только латиница и цифры");
        }

        if (!login.match(/^[a-zA-z]+$/)) {
            throw new Error("Логин не должен состоять только из цифр");
        }
        return true;

    }

    private checkPassword(password) {
        
        const upperCaseLetters = password.split("").filter(character => {
            return (character == character.toUpperCase()) && isNaN(character);
        });
        console.log(upperCaseLetters);
        if (upperCaseLetters.length === 0) {
            return new Error("Хотя бы одна буква должна быть заглавной.");
        }

        if (password.length < 8 || password.length > 40) {
            return new Error("Длина пароля должна быть не менее 8 симолов и не более 40 символов");
        }
        
        return true;
    }
}
