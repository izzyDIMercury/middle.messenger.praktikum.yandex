import FormSubmit from "../core/formSubmit.ts";
import AuthApi from "../api/auth.ts";
import { switchPage } from "../core/utils.ts";

export default class RegisterController {


    public async register(dataToValidate: Array<string | boolean>, eventType: string) {
        window.store.setState({ isLoading: true })
        const submit = new FormSubmit(...dataToValidate);
        const api = new AuthApi();
        try {
            if (submit.validated && eventType === "click") {
                const result = await api.register(submit.userData);
                if (result.responseText !== "OK") {
                    throw new Error(result.responseText);
                }
                switchPage(null, "messenger");            
            }
        } catch (error) {
            console.log(error);
        }
        window.store.setState({ isLoading: false })
    }    
} 
