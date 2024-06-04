import HTTPTransport from "./request.ts";

type UserData = Record<string, string> | null;

export default class FormSubmit {

    public validated: boolean = false;
    private userData: UserData = null;

    constructor({ formClass, parentClass, errorClass }) {

        const form = document.querySelector(`.${formClass}`);
        const inputs = Object.values(form.querySelectorAll("input"));
        const checkResult = this.checkForErrors(inputs);

        if (checkResult.hasErrors) {
            this.showErrorMessage(checkResult, parentClass, errorClass);
            this.validated = false;
        } else {
            this.hideErrorMessage(errorClass);
            this.validated = true; 
        }

        this.userData = this.getData(inputs);
    }

    private getData(inputs) {
        const userData = {};
        inputs.forEach(el => {
            userData[el.name] = el.value;
        })
        console.log(userData);
        return userData;
    }

    public sendData(url, method) {
        new HTTPTransport()[`${method}`](url, { data: this.userData });
    }

    private checkForErrors(inputs) {

        const checks = inputs.map(element => {
            if (element.name === "login") {
                return {type: "login", error: this.checkLogin(element.value)};
            } else if (element.type === "password") {
                return {type: "password", error: this.checkPassword(element.value)};
            } else if (element.name === "first_name" || element.name === "second_name") {
                return {type: "name", error: this.checkName(element.value)};
            } else if (element.name === "email") {
                return {type: "email", error: this.checkEmail(element.value)};
            } else if (element.name === "tel") {
                return {type: "tel", error: this.checkTel(element.value)};
            } else if (element.name === "message") {
                return {type: "message", error: this.checkMessage(element.value)};
            } else if (element.name === "display_name") {
                return {type: "display_name", error: this.checkDisplayName(element.value)};
            }
        });
        const result = this.validate(checks);
        console.log(result);
        return result;
    }

    private showErrorMessage(checkResult, parentClass, errorClass) {
        const { type, message } = checkResult;
        const parent = document.querySelector(`.${parentClass}`);
        if (parent?.querySelector(`.${errorClass}`)) {
            const oldElement = parent?.querySelector(`.${errorClass}`);
            oldElement?.remove();
        }
        const element = document.createElement("p");
        element.setAttribute("class", errorClass);
        const text = document.createTextNode(message);
        element.appendChild(text);
        parent?.appendChild(element);
    }

    private hideErrorMessage(errorClass) {
        const element = document.querySelector(`.${errorClass}`);
        element?.remove();
    }

    public validate(checks) {
        let result = { hasErrors: false }
        for (let i = 0; i < checks.length; i++) {
            if (checks[i].error) {
                result = { type: checks[i].type, hasErrors: true, message: checks[i].error.message};
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
            return new Error("Для логина опускаются только латиница и цифры.");
        }

        if (!login.match(/[a-zA-Z]/)) {
            return new Error("Логин не должен состоять только из цифр.");
        }
        return false;

    }

    private checkPassword(password: string = "") {

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
            return new Error("Хотя бы одна буква в пароле должна быть заглавной.");
        }

        // const passwords = props.filter(prop => prop.name === "password").map(el => el.value);
        // if (passwords.length === 2 && passwords[0] !== passwords[1]) {
        //     return new Error("Пароли должны совпадать.");
        // }

        
        return false;
    }
 
    private checkName(name) {

        if (name.length === 0) {
            return new Error("Укажите имя/фамилию.");
        }

        if (!name.match(/[a-zA-Zа-яА-ЯёЁ]/)) {
            return new Error("В имени/фамилии допускаются только кирилица м латиница");
        }

        if (name[0] != name[0].toUpperCase()) {
            return new Error("Первая буква имени/фамилии должна быть заглавной");
        }

        return false;
    }

    private checkEmail(email) {

        // console.log(email);

        if (email.length === 0) {
            return new Error("Укажите почту.");
        }


        if (!email.match(/^[-_@\.a-zA-Z0-9]+$/)) {
            return new Error("В почтовом адреме используются некорректные симолы");
        }

        if (!email.match(/[@]+[-_a-zA-Z0-9]+[\.]+/)) {
            return new Error("В почтовом адреме отсутствуют необходимые символы.");
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
            return new Error("Телефонный номер должен начинаться с цифры или символа +");
        } 

        return false;
    }

    private checkMessage(message: string = "") {

        if (message.length === 0) {
            return new Error("Сообщение не должно быть пустым");
        }

        return false;
    }

    private checkDisplayName(name) {

        if (name.length === 0) {
            return new Error("Укажите имя в чате.");
        }

        if (name.length < 3 || name.length > 20) {
            return new Error("Длина имени в чате должна быть не менее 3 и не более 20 символов.");
        }

        if (!name.match(/^[\w-]+$/)) {
            return new Error("Для имени в чате опускаются только латиница и цифры.");
        }
    }
}
