import Block from "../../core/block.ts";


export default class Dialog extends Block {
    constructor(props) {
        super("form", {
            ...props
        })
    }

    render() {
        return (
            `   
                <div class="dialog-wrapper">
                    <main class="dialog">
                    {{> @partial-block }}
                    </main>
                </div>                      
            `
        )
    }
}

// <div class="error-links">
//     <p class="error-links__text">Ссылки на страницы 404 и 500</p>
//     {{> Link page="404" text="404" }}
//     {{> Link page="500" text="500" }}
// </div>
