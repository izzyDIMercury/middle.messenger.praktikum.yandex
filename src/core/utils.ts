import FormSubmit from "./formSubmit.ts";

export function switchPage(page) {
    console.log("page");
    document.dispatchEvent(new CustomEvent("switchPage", { detail: {
        page: page
    }}));
}

export function checkForErrors(formQuery = "form", inputQuery = "input") {
    const form = document.querySelector(formQuery);
    const inputs = Object.values(form.querySelectorAll(inputQuery));
    const checks = new FormSubmit(inputs);
    const result = checks.validate();
    return result;
}

export function showErrorMessage(args, parentQuery, errorClass) {
    const { type, message } = args;
    const parent = document.querySelector(parentQuery);
    // const listElement = document.querySelector(".login-page__input-elements");
    if (parent?.querySelector(`.${errorClass}`)) {
        const oldElement = parent?.querySelector(`.${errorClass}`);
        oldElement?.remove();
    }
    const element = document.createElement("p");
    element.setAttribute("class", errorClass);
    const text = document.createTextNode(message);
    console.log(element);
    element.appendChild(text);
    parent?.appendChild(element);
}
