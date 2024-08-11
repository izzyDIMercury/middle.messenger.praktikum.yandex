import FormSubmit from "../core/formSubmit.ts";
import AuthApi from "../api/auth.ts";
import { switchPage } from "../core/utils.ts";
// import { GlobalStore } from "../store.ts";

export default class RegisterController {


    public async register(formClass: string, errorClass: string, isMessage?: boolean, eventType?: string) {
        //@ts-expect-error can't properly type window.store
        window.store.setState({ isLoading: true })
        const submit = new FormSubmit(formClass, errorClass, isMessage, eventType);
        const api = new AuthApi();
        console.log(submit.userData, eventType);
        try {
            if (submit.validated && eventType === "click") {
                const result = await api.register(submit.userData);
                if (result.status !== 200) {
                    throw new Error(result.responseText);
                }
                switchPage(null, "messenger");            
            }
        } catch (error) {
            if (String(error).includes("User already in system") || String(error).includes("Login already exists")) {
                alert("Пользователь уже зарегистрирован.");
                switchPage(null, "messenger"); // Mas42er92s
            }
            console.log(error);
        }
        //@ts-expect-error can't properly type window.store
        window.store.setState({ isLoading: false })
    }    
}
