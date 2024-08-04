import Block from "../../core/block.ts";
import LoginForm from "../../components/login-form/login-form.ts";
import Link from "../../components/link/link.ts";
import Loading from "../../components/loading/loading.ts";
import { switchPage } from "../../core/utils.ts";
import { connect } from "../../core/connect.ts";
import LoginController from "../../controllers/login.ts";

type LoginPageProps = {};

class LoginPage extends Block<LoginPageProps> {

    constructor(props: LoginPageProps) {
        super({
            ...props
        });
    }

    init() {
        const handleBlurBind = this.handleBlur.bind(this);
        const handleSubmitBind = this.handleSubmit.bind(this);
        const handleMouseOverBind = this.handleMouseOver.bind(this);

        const Form = new LoginForm({
            blur: handleBlurBind,
            mouseover: handleMouseOverBind,
            events: {
                submit: handleSubmitBind
            }
        });

        const Error404Link = new Link({
            text: "404",
            page: "404",
            events: {
                click: switchPage
            }
        });
        const Error500Link = new Link({
            text: "500",
            page: "500",
            events: {
                click: switchPage
            }
        });
        const LoadingWindow = new Loading("")

        this.children = {
            Form,
            Error404Link,
            Error500Link,
            LoadingWindow
        };
    }

    handleBlur(event: FocusEvent) {
        event.preventDefault();
        this.handleSubmit(event);
    }

    handleMouseOver(event: MouseEvent) {
        event.preventDefault();
        const inputs = document.querySelectorAll(".input__element") as NodeListOf<HTMLInputElement>;
        inputs.forEach(input => {
            input.blur();
        })
    }

    handleSubmit(event: FocusEvent | MouseEvent) {
        console.log(event);
        event.preventDefault();
        const controller = new LoginController();
        controller.login([ "login-page", "login-page__error-text", false, event.type ], event.type);
    }

    componentDidMount(): void {
        async function checkLoggedIn() {
            const controller = new LoginController();
            const response = await controller.checkLoggedIn();
            if (response.status === 200) {
                switchPage(null, "messenger");
            }
        }

        checkLoggedIn();
    }

    render() {
        return (`
            <div class="dialog-wrapper">
                <div class="error-links">
                <p class="error-links__text">Ссылки на страницы 404 и 500</p>
                {{{ Error404Link }}}
                {{{ Error500Link }}}
            </div>
                <main class="dialog">
                    {{{ Form }}}
                    {{#if isLoading}}
                        {{{ LoadingWindow }}}
                    {{/if}}
                </main>
            </div>  
            `
        );
    }
}


const mapStateToPropsShort = ({ isLoading }): object => {
    return { isLoading }
}

export default connect(mapStateToPropsShort)(LoginPage);
