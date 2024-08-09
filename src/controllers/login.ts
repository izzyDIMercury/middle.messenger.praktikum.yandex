import FormSubmit from "../core/formSubmit.ts";
import AuthApi from "../api/auth.ts";
import { switchPage } from "../core/utils.ts";
// import { GlobalStore } from "../store.ts";

export default class LoginController {

    public async login(formClass: string, errorClass: string, isMessage?: boolean, eventType?: string) {
        //@ts-expect-error can't properly type window.store
        window.store.setState({ isLoading: true });
        const submit = new FormSubmit(formClass, errorClass, isMessage, eventType);
        const api = new AuthApi();


        try {
            if (submit.validated && eventType === "submit") {
                console.log("VALIDATED");
                const result = await api.login(submit.userData);
                if (result.responseText !== "OK") {
                    throw new Error(result.responseText)
                }
                console.log("Login: ", result.responseText);
                switchPage(null, "messenger");
            }
        } catch (error) {
            if (String(error).includes("User already in system")) {
                switchPage(null, "messenger");
            } else if (String(error).includes("Login or password is incorrect")) {
                alert("Неверно введены имя пользователя или пароль.");
            } else {
                console.log(String(error));
            }
        }
        //@ts-expect-error can't properly type window.store
        window.store.setState({ isLoading: false })
    }

    public async checkLoggedIn() {
        const api = new AuthApi();
        return api.userInfo();
    }
} 
