import HTTPTransport from "./request.ts";
import type { UserData } from "../types.js";

// type Data = Record<string, string>;

// interface HTMLProps extends HTMLInputElement {
//     name: string,
//     value: string
// }

type Check = { label: string, hasErrors: boolean, error: Error, isEmpty: boolean, element: HTMLInputElement };
type DataItem = { hasErrors: boolean, name: string, value: string };

export default class FormSubmit {
    public validated: boolean = false;

    public isMessage: boolean = false;

    private userData: UserData = {};

    constructor(formClass: string, errorClass: string, isMessage?: boolean, eventType?: string) {
        const form: HTMLElement | null = document.querySelector(`.${formClass}`);
        const inputs: HTMLInputElement[] = Object.values(form ? form.querySelectorAll("input") : {});
        const checksResult = this.checkForErrors(inputs);

        const data = checksResult.map(check => {
            if (!isMessage) {
                return this.handleErrorMessages(check, errorClass, eventType as string);
            } else if (isMessage && check.isEmpty) {
                console.log("Сообщение не должно быть пустым!");
                return { hasErrors: true, name: check?.element.name, value: check?.element.value };
            } else if (isMessage && !check.isEmpty) {
                return { hasErrors: false, name: check?.element.name, value: check?.element.value };
            }
        })

        const result = data as DataItem[];
        
        const anyErrors = result.filter(item => item.hasErrors);

        result.forEach(item => {      
            this.userData[item.name] = item.value;
            console.log(this.userData);
        })

        if (anyErrors.length === 0) {
            this.validated = true;
        }
    }

    private checkFocused(element: HTMLInputElement) {
        const container = element.closest("li") as HTMLElement;
        const updatedElement = container.querySelector(`#${element.id}`) as HTMLElement;
        const result = updatedElement.getAttribute("was_focused");
        if (result === "true") {
            return true;
        } else if (result === "false") {
            return false;
        }
    }

    private handleErrorMessages(check: Check, errorClass: string, eventType: string) {
        if ((check.hasErrors && eventType === "blur" && !check.isEmpty) 
            || (check.hasErrors && eventType === "click")
            || (check.hasErrors && eventType === "blur" && this.checkFocused(check?.element))) {
            this.showErrorMessage(check, errorClass);
        } else if (!check.hasErrors) {
            this.hideErrorMessage(check, errorClass);
        }
        return { hasErrors: check?.hasErrors, name: check?.element.name, value: check?.element.value };
    }

    private showErrorMessage(check: Check, errorClass: string) {
        const container = check.element.closest("li") as HTMLElement;
        if (container.querySelector("p")) {
            this.hideErrorMessage(check, errorClass);
        }
        const element = document.createElement("p");
        element.setAttribute("class", errorClass);
        const text = document.createTextNode(check.error.message);
        element.appendChild(text);
        container.appendChild(element);
    }

    private hideErrorMessage(check: Check, errorClass: string) {
        const container = check.element.closest("li") as HTMLElement;
        const errorMessage = container.querySelector(`.${errorClass}`);
        errorMessage?.remove();
    }

    private checkForErrors(inputs: HTMLInputElement[]) {

        const checks = inputs.map((element) => {
            if (element.name === "login") {
                const { hasErrors, error, isEmpty } = this.checkLogin(element.value);
                return { label: element.id, hasErrors, error, isEmpty, element };
            } if (element.type === "password") {
                const { hasErrors, error, isEmpty } = this.checkPassword(element.value);
                return { label: element.id, hasErrors, error, isEmpty, element };
            } if (element.name === "first_name" || element.name === "second_name") {
                const { hasErrors, error, isEmpty } = this.checkName(element.value);
                return { label: element.id, hasErrors, error, isEmpty, element };
            } if (element.name === "email") {
                const { hasErrors, error, isEmpty } = this.checkEmail(element.value);
                return { label: element.id, hasErrors, error, isEmpty, element };
            } if (element.name === "tel") {
                const { hasErrors, error, isEmpty } = this.checkTel(element.value);
                return { label: element.id, hasErrors, error, isEmpty, element };
            } if (element.name === "message") {
                const { hasErrors, error, isEmpty } = this.checkMessage(element.value);
                return { label: element.id, hasErrors, error, isEmpty, element };
            } if (element.name === "display_name") {
                const { hasErrors, error, isEmpty } = this.checkDisplayName(element.value);
                return { label: element.id, hasErrors, error, isEmpty, element };
            }
        });

        return checks as Check[];
        // const result = this.validate(checks as Check[]);
        // return result;
    }






    // public validate(checks: Check[]) {
    //     let result = { hasErrors: false, type: "", message: "" };
    //     for (let i = 0; i < Number(checks.length); i++) {
    //         if (checks[i].hasErrors) {
    //             result = { type: checks[i].type, hasErrors: true, message: checks[i].error.message };
    //             break;
    //         }
    //     }
    //     return result;
    // }

    // private showErrorMessage(message: string, parentClass: string, errorClass: string) {
    //     // const { type, message } = checkResult;
    //     const parent = document.querySelector(`.${parentClass}`);
    //     if (parent?.querySelector(`.${errorClass}`)) {
    //         const oldElement = parent?.querySelector(`.${errorClass}`);
    //         oldElement?.remove();
    //     }
    //     const element = document.createElement("p");
    //     element.setAttribute("class", errorClass);
    //     const text = document.createTextNode(message);
    //     element.appendChild(text);
    //     parent?.appendChild(element);
    // }

    // private hideErrorMessage(errorClass: string) {
    //     const element = document.querySelector(`.${errorClass}`);
    //     element?.remove();
    // }

    private checkLogin(login: string = "") {
        if (login.length === 0) {
            return { isEmpty: true, hasErrors: true, error: new Error("Укажите логин.") };
        }

        if (login.length < 3 || login.length > 20) {
            return { isEmpty: false, hasErrors: true, error: new Error("Длина логина должна быть не менее 3 и не более 20 символов.") };
        }

        if (!login.match(/^[\w-]+$/)) {
            return { isEmpty: false, hasErrors: true, error: new Error("Для логина опускаются только латиница и цифры.") };
        }

        if (!login.match(/[a-zA-Z]/)) {
            return { isEmpty: false, hasErrors: true, error: new Error("Логин не должен состоять только из цифр.") };
        }
        return { isEmpty: false, hasErrors: false, error: new Error() };
    }

    private checkPassword(password: string = "") {
        if (password.length === 0) {
            return { isEmpty: true, hasErrors: true, error: new Error("Укажите пароль.") };
        }

        if (password.length < 8 || password.length > 40) {
            return { isEmpty: false, hasErrors: true, error: new Error("Длина пароля должна быть не менее 8 симолов и не более 40 символов.") };
        }

        if (!password.match(/[0-9]/)) {
            return { isEmpty: false, hasErrors: true, error: new Error("Пароль должен содержать хотя бы одну цифру.") };
        }

        const upperCaseLetters = password.split("").filter((character) => (character == character.toUpperCase()) && !Number.isNaN(Number(character)));
        if (upperCaseLetters.length === 0) {
            return { isEmpty: false, hasErrors: true, error: new Error("Хотя бы одна буква в пароле должна быть заглавной.") };
        }

        return { isEmpty: false, hasErrors: false, error: new Error() };
    }

    private checkName(name: string) {
        if (name.length === 0) {
            return { isEmpty: true, hasErrors: true, error: new Error("Укажите имя/фамилию.") };
        }

        if (!name.match(/[a-zA-Zа-яА-ЯёЁ]/)) {
            return { isEmpty: false, hasErrors: true, error: new Error("В имени/фамилии допускаются только кирилица м латиница") };
        }

        if (name[0] != name[0].toUpperCase()) {
            return { isEmpty: false, hasErrors: true, error: new Error("Первая буква имени/фамилии должна быть заглавной") };
        }

        return { isEmpty: false, hasErrors: false, error: new Error() };
    }

    private checkEmail(email: string) {
        if (email.length === 0) {
            return { isEmpty: true, hasErrors: true, error: new Error("Укажите почту.") };
        }

        if (!email.match(/^[-_@.a-zA-Z0-9]+$/)) {
            return { isEmpty: false, hasErrors: true, error: new Error("В почтовом адреме используются некорректные симолы") };
        }

        if (!email.match(/[@]+[-_a-zA-Z0-9]+[.]+/)) {
            return { isEmpty: false, hasErrors: true, error: new Error("В почтовом адреме отсутствуют необходимые символы.") };
        }

        const substring = email.split("@")[1].split(".")[0];
        if (!substring.match(/[a-zA-Z]/)) {
            return { isEmpty: false, hasErrors: true, error: new Error("Неправильно указана почта") };
        }

        return { isEmpty: false, hasErrors: false, error: new Error() };
    }

    private checkTel(tel: string) {
        if (tel.length === 0) {
            return { isEmpty: true, hasErrors: true, error: new Error("Укажите номер телефона.") };
        }

        if (tel.length < 10 || tel.length > 15) {
            return { isEmpty: false, hasErrors: true, error: new Error("Неверная длина телефонного номера") };
        }

        if (!tel.match(/^[0-9]+$/)) {
            return { isEmpty: false, hasErrors: true, error: new Error("Телефонный номер должен состоять из цифр") };
        }

        if (tel[0] !== "+" && typeof Number(tel[0]) !== "number") {
            return { isEmpty: false, hasErrors: true, error: new Error("Телефонный номер должен начинаться с цифры или символа +") };
        }

        return { isEmpty: false, hasErrors: false, error: new Error() };
    }

    private checkMessage(message: string = "") {
        if (message.length === 0) {
            return { isEmpty: true, hasErrors: true, error: new Error("Сообщение не должно быть пустым") };
        }

        return { isEmpty: false, hasErrors: false, error: new Error() };
    }

    private checkDisplayName(name: string) {
        if (name.length === 0) {
            return { isEmpty: true, hasErrors: true, error: new Error("Укажите имя в чате.") };
        }

        if (name.length < 3 || name.length > 20) {
            return { isEmpty: false, hasErrors: true, error: new Error("Длина имени в чате должна быть не менее 3 и не более 20 символов.") };
        }

        if (!name.match(/^[\w-]+$/)) {
            return { isEmpty: false, hasErrors: true, error: new Error("Для имени в чате опускаются только латиница и цифры.") };
        }

        return { isEmpty: false, hasErrors: false, error: new Error() };
    }

    // private getData(inputs: HTMLInputElement[]) {
    //     const userData: Record<string, string> = {};
    //     inputs.forEach((value: HTMLProps) => {
    //         userData[value.name] = value.value;
    //     });

    //     // Log user data object:
    //     console.log(userData);
    //     //
    //     return userData;
    // }

    public sendData(url: string, method: string) {
        // const userData = { data: this.userData };
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
}
