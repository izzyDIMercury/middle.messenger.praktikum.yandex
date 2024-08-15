import { expect } from "chai";
import { Router, Route } from "./router";
import Block from "./block.ts";

type PageProps = {};

describe("Router", () => {
    // let RouterClass: typeof Router;
    let Page1: typeof Block<PageProps>;
    // let Page2: typeof Block<PageProps>;
    let router: Router;

    before(() => {
        router = new Router("#app");

        class Page extends Block<PageProps> {
            constructor(props: PageProps) {
                super({
                    ...props
                })
            }

            render(): string {
                return `<p class="text-class">sometext</p>`
            }
        }

        Page1 = Page;
        // Page2 = Page;
    })

    it("При запуске роутера рендерится компонент", () => {
        const text = "sometext";
        router.use("/", Page1 as typeof Block);
        router.use("/messenger", Page1 as typeof Block);
        router.use("/settings", Page1 as typeof Block);
        router.start();

        const elementText = document.querySelector(".text-class")?.innerHTML;
        expect(elementText).to.be.eq(text);

    })

    it("Должен выполняться переход на страницу", () => {
        const text = "messenger";

        router.go("/messenger");

        const location: string = window.location.href;
        const page = location.split("/").reverse()[0];

        expect(page).to.be.eq(text);
    })

    // it("Проверка возврата на предыдущую страницу", () => {
    //     const text = "messenger";

    //     router = new Router("#app");
    //     router.use("/", Page1 as typeof Block);
    //     router.use("/messenger", Page1 as typeof Block);
    //     router.use("/settings", Page2 as typeof Block);
    //     router.start();
    //     router.go("/messenger");
    //     router.go("/settings");
    //     router.back();

    //     const location: string = window.location.href;
    //     const page = location.split("/").reverse()[0];
    //     console.log("PAGE: ", window.history.state);

    //     expect(page).to.be.eq(text);
    // })

    // it("Проверка перехода на следующую страницу", () => {
    //     const text = "settings";
    //     router.forward();

    //     const location: string = window.location.href;
    //     const page = location.split("/").reverse()[0];

    //     expect(page).to.be.eq(text);
    // })
})
