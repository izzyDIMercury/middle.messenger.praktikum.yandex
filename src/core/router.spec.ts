import { expect } from "chai";
import sinon from 'sinon';
import { Router, Route } from "./router";
import Block from "./block.ts";

type PageProps = {};

describe("Router", () => {
    let RouterClass: typeof Router;
    let Page1: typeof Block<PageProps>;
    let Page2: typeof Block<PageProps>;
    let Page3: typeof Block<PageProps>;

    before(() => {
        RouterClass = Router;

        class Page extends Block<PageProps> {
            constructor(props: PageProps) {
                super({
                    ...props
                })
            }

            render(): string {
                return `<div>page</div>`
            }
        }

        RouterClass = Router;
        Page1 = Page;
        Page2 = Page;
        Page3 = Page;
    })

    it("Должен выполняться переход на страницу", () => {
        const page = "messenger";
        const router = new RouterClass();
        router.use("/messenger", Page1)
        router.go(`/${page}`);
        console.log("MYLOG: ", document.location);
    })
})
