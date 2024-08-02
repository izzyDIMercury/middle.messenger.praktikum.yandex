import FormSubmit from "../core/formSubmit.ts";
import AuthApi from "../api/auth.ts";
import { switchPage } from "../core/utils.ts";

export default class LoginController {


    public async login(dataToValidate: Array<string | boolean>, eventType: string) {
        window.store.setState({ isLoading: true })
        const submit = new FormSubmit(...dataToValidate);
        const api = new AuthApi();
        // const out = await api.logout();
        // const info = await api.userInfo();
        // console.log(info);

        try {
            if (submit.validated && eventType === "click") {
                const result = await api.login(submit.userData);
                if (result.responseText !== "OK") {
                    throw new Error(result.responseText)
                }
                switchPage(null, "messenger");
            }
        } catch (error) {
            if (String(error).includes("User already in system")) {
                switchPage(null, "messenger");
            } else {
                console.log(String(error));
            }
        }
        window.store.setState({ isLoading: false })

        // slash
        // Mas42er92s
    }
} 
