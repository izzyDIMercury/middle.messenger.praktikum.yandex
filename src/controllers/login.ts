import FormSubmit from "../core/formSubmit.ts";
import AuthApi from "../api/auth.ts";
import { switchPage } from "../core/utils.ts";

export default class LoginController {


    public async login(dataToValidate: Array<string | boolean>, eventType: string) {
        window.store.setState({ isLoading: true })
        const submit = new FormSubmit(...dataToValidate);
        const api = new AuthApi();
        // const out = await api.logout();
        // console.log(out);
        // const info = await api.userInfo();
        // console.log("LOGIN: ", submit.validated, eventType);

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
        window.store.setState({ isLoading: false })

        // slash
        // Mas42er92s 
    }
} 
