import { expect } from "chai";
// import sinon from "sinon";
import FormSubmit from "./formSubmit";

describe("FormSubmit", () => {
    const TestForm = FormSubmit;

    it("Проверка логина", () => {
        const login = "izzy321";
        //@ts-expect-error check private property
        const { hasErrors } = TestForm.prototype.checkLogin(login);
        expect(hasErrors).to.be.eq(false);
    })

    it("Проверка пароля", () => {
        const password = "Mas42er92s";
        //@ts-expect-error check private property
        const { hasErrors } = TestForm.prototype.checkPassword(password);
        expect(hasErrors).to.be.eq(false);
    })

    it("Проверка имени", () => {
        const name = "Петр";
        //@ts-expect-error check private property
        const { hasErrors } = TestForm.prototype.checkName(name);
        expect(hasErrors).to.be.eq(false);
    })

    it("Проверка почты", () => {
        const email = "mymail@mail.ru";
        //@ts-expect-error check private property
        const { hasErrors } = TestForm.prototype.checkEmail(email);
        expect(hasErrors).to.be.eq(false);
    })

    it("Проверка телефона", () => {
        const phone = "89613125555";
        //@ts-expect-error check private property
        const { hasErrors } = TestForm.prototype.checkTel(phone);
        expect(hasErrors).to.be.eq(false);
    })

    it("Проверка сообщения", () => {
        const message = "message";
        //@ts-expect-error check private property
        const { hasErrors } = TestForm.prototype.checkMessage(message);
        expect(hasErrors).to.be.eq(false);
    })

    it("Проверка имени в чате", () => {
        const name = "izzy";
        //@ts-expect-error check private property
        const { hasErrors } = TestForm.prototype.checkDisplayName(name);
        expect(hasErrors).to.be.eq(false);
    })
})
