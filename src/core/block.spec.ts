import { expect } from "chai";
import sinon from 'sinon';
import Block from "./block";

interface PageProps {
    text?: string,
    events?: Record<string, () => void>
}

describe.skip("Block", () => {
    let PageClass: typeof Block<PageProps>;

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
                    <button>{{text-button}}</button>
                </div>`
            }
        }

        PageClass = Page;
    })

    it("Должен создать компонент с состоянием из конструктора", () => {
        const text = "Test";
        const pageComponent = new PageClass({text});
        const spanText = pageComponent.element?.querySelector("#test-text")?.innerHTML;
        expect(spanText).to.be.eq(text);

    })

    it("Компонент должен быть реактивен", () => {
        const text = "New value";
        const pageComponent = new PageClass({text: "Initial value" });
        pageComponent.setProps({ text });
        const spanText = pageComponent.element?.querySelector("#test-text")?.innerHTML;
        expect(spanText).to.be.eq(text);
    })

    it("Компонент должен навешивать события", () => {
        const stub = sinon.stub();
        const pageComponent = new PageClass({events: {
            click: stub
        }});
        const event = new MouseEvent('click');
        pageComponent.element?.dispatchEvent(event);
        expect(stub.calledOnce).to.be.true;
    })

    it("Компонент должен перередериваться после обновления пропсов", () => {
        const text = "New value";
        const pageComponent = new PageClass({text: "Initial value" });
        const spyRender = sinon.spy(pageComponent, "_render");
        pageComponent.setProps({ text });
        expect(spyRender.calledOnce).to.be.true;
    })
})
