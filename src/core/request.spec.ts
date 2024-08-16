import { use, expect } from "chai";
import sinonChai from "sinon-chai";
import HTTPTransport from "./request.ts";
import sinon from 'sinon';

describe("HTTPTransport", () => {
    use(sinonChai);
    const sandbox = sinon.createSandbox();
    let HTTP: HTTPTransport;
    let request: any;
    const xhr = sinon.useFakeXMLHttpRequest() as unknown as XMLHttpRequest;

    beforeEach(() => {
        HTTP = new HTTPTransport();
        request = sandbox.stub(HTTP, "request" as keyof typeof HTTP).callsFake(() => Promise.resolve(xhr))
    })

    afterEach(() => {
        sandbox.restore();
    })

    it("Проверка преобразования параметров регистрации", () => {
        //@ts-expect-error private method
        const string = HTTP.stringify({ first_name: "Джон", second_name: "До", login: "izzy", email: "izzy@gmail.com", phone: "89612175654" });

        expect(string).to.be.eq("?first_name=Джон&second_name=До&login=izzy&email=izzy@gmail.com&phone=89612175654");
    })

    it("Проверка преобразования в строку параметра с массивом", () => {
        //@ts-expect-error private method
        const string = HTTP.stringify({ users: [ 1264, 1265 ], chatId: 37281 });
        expect(string).to.be.eq("?users=1264,1265&chatId=37281");
    })

    it("Проверка вызова метода GET", () => {
        HTTP.get("", {});
        expect(request).calledWithMatch("", { method: "GET" }, undefined);
    })

    it("Проверка вызова метода POST", () => {
        HTTP.post("", {
            data: { id: 1 },
            headers: {
                ["content-type"]: "application/json"
            }
        });
        expect(request).calledWithMatch("", {
            method: "POST",
            data: { id: 1 },
            headers: {
                ["content-type"]: "application/json"
            }
        }, undefined);
    })

    it("Проверка вызова метода PUT", () => {
        HTTP.put("", {
            data: { id: 1 },
            headers: {
                ["content-type"]: "application/json"
            }
        });
        expect(request).calledWithMatch("", {
            method: "PUT",
            data: { id: 1 },
            headers: {
                ["content-type"]: "application/json"
            }
        }, undefined);
    })

    it("Проверка вызова метода DELETE", () => {
        HTTP.delete("", {
            data: { id: 1 },
            headers: {
                ["content-type"]: "application/json"
            }
        });
        expect(request).calledWithMatch("", {
            method: "DELETE",
            data: { id: 1 },
            headers: {
                ["content-type"]: "application/json"
            }
        }, undefined);
    })
})
