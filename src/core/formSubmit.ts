export default class FormSubmit {
    constructor(props) {
        this.checklist = props.map(element => {
            if (element.name === "login") {
                return {type: "login", error: this.checkLogin(element.value)};
            } else if (element.name === "password") {
                return {type: "password", error: this.checkPassword(element.value, props)};
            } else if (element.name === "first_name" || element.name === "second_name") {
                return {type: "name", error: this.checkName(element.value)};
            } else if (element.name === "email") {
                return {type: "email", error: this.checkEmail(element.value)};
            } else if (element.name === "tel") {
                return {type: "tel", error: this.checkTel(element.value)};
            } else if (element.name === "message") {
                return {type: "message", error: this.checkMessage(element.value)};
            }
        });
    }

    public validate() {
        let result = { hasErrors: false }
        for (let i = 0; i < this.checklist.length; i++) {
            if (this.checklist[i].error) {
                result = { type: this.checklist[i].type, hasErrors: true, message: this.checklist[i].error.message};
                break;
            }
        }
        return result;
    }

    private checkLogin(login: string = "") {

        if (login.length === 0) {
            return new Error("Укажите логин.");
        }

        if (login.length < 3 || login.length > 20) {
            return new Error("Длина логина должна быть не менее 3 и не более 20 символов.");
        }

        if (!login.match(/^[\w-]+$/)) {
            return new Error("Допускаются только латиница и цифры.");
        }

        if (!login.match(/[a-zA-Z]/)) {
            return new Error("Логин не должен состоять только из цифр.");
        }
        return false;

    }

    private checkPassword(password, props) {

        if (password.length === 0) {
            return new Error("Укажите пароль.");
        }

        if (password.length < 8 || password.length > 40) {
            return new Error("Длина пароля должна быть не менее 8 симолов и не более 40 символов.");
        }

        if (!password.match(/[0-9]/)) {
            return new Error("Пароль должен содержать хотя бы одну цифру.")
        }
        
        const upperCaseLetters = password.split("").filter(character => {
            return (character == character.toUpperCase()) && isNaN(character);
        });
        if (upperCaseLetters.length === 0) {
            return new Error("Хотя бы одна буква должна быть заглавной.");
        }

        const passwords = props.filter(prop => prop.name === "password").map(el => el.value);
        if (passwords.length === 2 && passwords[0] !== passwords[1]) {
            return new Error("Пароли должны совпадать.");
        }

        
        return false;
    }
 
    private checkName(name) {

        if (name.length === 0) {
            return new Error("Укажите имя и фамилию.");
        }

        if (name.length === 0) {
            return new Error("Укажите имя.");
        }

        if (!name.match(/[a-zA-Zа-яА-ЯёЁ]/)) {
            return new Error("Допускаются только кирилица м латиница");
        }

        if (name[0] != name[0].toUpperCase()) {
            return new Error("Первая буква должжна быть заглавной");
        }

        return false;
    }

    private checkEmail(email) {

        if (email.length === 0) {
            return new Error("Укажите почту.");
        }


        if (!email.match(/^[-_@.a-zA-Z0-9]+$/)) {
            return new Error("Используются некорректные симолы");
        }

        const substring = email.split("@")[1].split(".")[0];
        if (!substring.match(/[a-zA-Z]/)) {
            return new Error("Неправильно указана почта");
        }

        return false;
    }

    private checkTel(tel) {

        if (tel.length === 0) {
            return new Error("Укажите номер телефона.");
        }

        if (tel.length < 10 || tel.length > 15) {
            return new Error("Неверная длина телефонного номера");
        }

        if (!tel.match(/^[0-9]+$/)) {
            return new Error("Телефонный номер должен состоять из цифр");
        }

        if  (tel[0] !== "+" && typeof Number(tel[0]) !== "number") {
            return new Error("Номер должен начинаться с цифры или символа +");
        } 

        return false;
    }

    private checkMessage(message: string = "") {

        if (message.length === 0) {
            return new Error("Сообщение не должно быть пустым");
        }

        return false;
    }
}
