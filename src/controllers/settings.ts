import FormSubmit from "../core/formSubmit.ts";
import UsersApi from "../api/users.ts";
import { switchPage } from "../core/utils.ts";

export default class SettingsController {

    public async logout() {
        window.store.setState({ isLoading: true })
        const api = new UsersApi();
        const result = await api.logout();
        console.log(result.response);
        switchPage(null, "");
        window.store.setState({ isLoading: false })
    }

    public async changeProfile(dataToValidate: Array<string | boolean>, eventType: string) {
        const submit = new FormSubmit(...dataToValidate);
        const api = new UsersApi();
        // const res2 = await api.userInfo();
        // console.log(res2);

        try {
            if (submit.validated && eventType === "click") {

                window.store.setState({ isLoading: true });
                const result = await api.changeUserData(submit.userData);
                console.log(result);
                if (result.status !== 200) {
                    throw new Error(result.status);
                }

                switchPage(null, "settings");
            }
        } catch (error) {
            alert("Ошибка: ", error);
            console.log("Error status: ", error);
        }
        // window.store.setState({ isLoading: false });
    }









    // public async login(dataToValidate: Array<string | boolean>, eventType: string) {
    //     window.store.setState({ isLoading: true })
    //     const submit = new FormSubmit(...dataToValidate);
    //     const api = new UsersApi();
    //     // const out = await api.logout();
    //     // const info = await api.userInfo();
    //     // console.log("LOGIN: ", submit.validated, eventType);

    //     try {
    //         if (submit.validated && eventType === "click") {
    //             // console.log("VALIDATED");
    //             const result = await api.login(submit.userData);
    //             if (result.responseText !== "OK") {
    //                 throw new Error(result.responseText);
    //             }
    //             switchPage(null, "messenger");
    //         }
    //     } catch (error) {
    //         if (String(error).includes("User already in system")) {
    //             switchPage(null, "messenger");
    //         } else {
    //             console.log(String(error));
    //         }
    //     }
    //     window.store.setState({ isLoading: false })

    //     // slash
    //     // Mas42er92s
    // }
} 
