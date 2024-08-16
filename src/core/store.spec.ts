import { expect } from "chai";
// import sinon from "sinon";
import { Store } from "./store"; 
import { connect } from "./connect.ts";
import Block from "./block";

type PageProps = {
    text: string,
    title?: string
}

describe("Store", () => {
    let PageClass: typeof Block<PageProps>;
    const store = new Store({ text: "Initial text", title: "Initial title" });
    //@ts-expect-error can't properly type window.store
    window.store = store;

    before(() => {
        class Page extends Block<PageProps> {
            constructor(props: PageProps) {
                super({
                    ...props
                })
            }

            render(): string {
                return `<div>
                    <span id="test-text">{{text}}</span>
                </div>`
            }
        }

        const mapStateToPropsShort = (props: PageProps): object => {
            return { text: props.text }
        }

        PageClass = connect(mapStateToPropsShort)(Page) as unknown as typeof Block<PageProps>;
    })

    afterEach(() => {
        //@ts-expect-error can't properly type window.store
        window.store.setState({ text: "Initial text", title: "Initial title" });
    })

    it("Проверить реактивность компонента при обновлении связанного с ним свойства в сторе", () => {
        const text = "Next text";
        const pageComponent = new PageClass({ text: "Initial text" });
        //@ts-expect-error can't properly type window.store
        window.store.setState({ text: "Next text" });
        const spanText = pageComponent.element?.querySelector("#test-text")?.innerHTML;
        expect(spanText).to.be.eq(text);
    })

    it("Убедиться, что компонент не перерендеривается при обновлении стороннего свойства в сторе", () => {
        const text = "Initial text";
        const pageComponent = new PageClass({ text });
        //@ts-expect-error can't properly type window.store
        window.store.setState({ title: "Next title" });
        const spanText = pageComponent.element?.querySelector("#test-text")?.innerHTML;
        expect(spanText).to.be.eq(text);
    })
})
