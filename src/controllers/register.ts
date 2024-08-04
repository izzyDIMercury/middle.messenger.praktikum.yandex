import FormSubmit from "../core/formSubmit.ts";
import AuthApi from "../api/auth.ts";
import { switchPage } from "../core/utils.ts";

export default class RegisterController {


    public async register(dataToValidate: Array<string | boolean>, eventType: string) {
        window.store.setState({ isLoading: true })
        const submit = new FormSubmit(...dataToValidate);
        const api = new AuthApi();
        console.log(submit.userData);
        try {
            if (submit.validated && eventType === "click") {
                const result = await api.register(submit.userData);
                if (result.responseText !== "OK") {
                    throw new Error(result.responseText);
                }
                switchPage(null, "messenger");            
            }
        } catch (error) {
            if (String(error).includes("User already in system") || String(error).includes("Login already exists")) {
                alert("Пользователь уже зарегистрирован.");
                switchPage(null, "messenger"); 
            }
            console.log(error);
        }
        window.store.setState({ isLoading: false })
    }    
}
