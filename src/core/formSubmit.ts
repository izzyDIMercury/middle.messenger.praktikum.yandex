import HTTPTransport from "./request.ts";
import type { UserData } from "../types.js";

// type Data = Record<string, string>;

interface HTMLProps extends HTMLInputElement {
    name: string,
    value: string
}

type Check = { type: string, error: boolean | Error };

export default class FormSubmit {

    public validated: boolean = false;
    public isMessage: boolean = false;
    private userData: UserData


    constructor(formClass: string, parentClass: string, errorClass: string, isMessage?: boolean) {

        const form: HTMLElement | null = document.querySelector(`.${formClass}`);
        const inputs: HTMLInputElement[] = Object.values(form ? form.querySelectorAll("input") : {});
        const checkResult: { type: string, message: string, hasErrors: boolean } = this.checkForErrors(inputs);

        if (checkResult.hasErrors) {
            if (isMessage) {
                console.log("Сообщение не должно быть пустым!");
            } else {
                this.showErrorMessage(checkResult.type, checkResult.message, parentClass, errorClass);
            }
            this.validated = false;
        } else {
            !isMessage && this.hideErrorMessage(errorClass);
            this.validated = true; 
        }

        this.userData = this.getData(inputs);
    }

    private getData(inputs: HTMLInputElement[]) {
        const userData: Record<string, string> = {};
        inputs.forEach((value: HTMLProps) => {
            userData[value.name] = value.value;
        })

        // Log user data object:
        console.log(userData);
        //
        return userData;
    }

    public sendData(url: string, method: string) {
        const userData = {data: this.userData};
        switch (method) {
            case "post":
                new HTTPTransport().post(url, { data: this.userData });
                break;
            case "delete":
                new HTTPTransport().delete(url, { data: this.userData });
                break;
            case "put":
                new HTTPTransport().put(url, { data: this.userData });
                break;
            default:
                new HTTPTransport().get(url, { data: this.userData });
                break;
        }
    }

    private checkForErrors(inputs: HTMLInputElement[]) {

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
        const result = this.validate(checks as Check[]);
        return result;
    }

    private showErrorMessage(type: string, message: string, parentClass: string, errorClass: string) {
        // const { type, message } = checkResult;
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

    private hideErrorMessage(errorClass: string) {
        const element = document.querySelector(`.${errorClass}`);
        element?.remove();
    }

    public validate(checks: Check[]) {
        let result = { hasErrors: false, type: "", message: "" }
        for (let i = 0; i < Number(checks.length); i++) {
            if (checks[i].error) {
                result = { type: checks[i].type, hasErrors: true, message: checks[i].error.message };
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
