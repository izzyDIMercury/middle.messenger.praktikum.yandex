import { expect } from "chai";
// import sinon from 'sinon';
import Block from "./block";

interface PageProps {
    text?: string,
    events?: Record<string, () => void>
}

describe('Block', () => {
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

    // написать тест на то что комопнент создается с переданными пропсами
    it('Должен создать компонент с состоянием из конструктора', () => {
        const text = 'Hello'
        const pageComponent = new PageClass({text});

        const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML;

        expect(spanText).to.be.eq(text);

    })
})
