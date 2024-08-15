import { expect } from "chai";
import { Router, Route } from "./router";
import Block from "./block.ts";

type PageProps = {};


describe("Router", () => {
    let Page1: typeof Block<PageProps>;
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
    })

    it("При запуске роутера рендерится компонент", () => {
        const text = "sometext";
        router.use("/", Page1 as typeof Block);
        router.start();

        const elementText = document.querySelector(".text-class")?.innerHTML;
        expect(elementText).to.be.eq(text);

    })

    it("Метод use() добавляет роут в массив роутов", () => {
        const text = "/messenger";

        router.use("/messenger", Page1 as typeof Block);

        //@ts-expect-error check private property
        const routes = router.routes as Route[];
        const route = routes[routes.length - 1];
        //@ts-expect-error check private property
        const pathname = route.pathname;

        expect(pathname).to.be.eq(text);
    })

    it("Должен выполняться переход на страницу", () => {
        const text = "messenger";

        router.go("/messenger");

        const location: string = window.location.href;
        const page = location.split("/").reverse()[0];

        expect(page).to.be.eq(text);
    })

    it("Метод match() корректно находит совпадающий роут", () => {
        const text = "/messenger";
        //@ts-expect-error check private property
        const routes = router.routes as Route[];
        const result = routes.find(route => route.match(text));
        //@ts-expect-error check private property
        const pathname = result.pathname;
        
        expect(pathname).to.be.eq(text);
    })
})
