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

        try {
            if (submit.validated && eventType === "click") {

                window.store.setState({ isLoading: true });
                const result = await api.changeUserData(submit.userData);

                if (result.status !== 200) {
                    throw new Error(result.status);
                }

                switchPage(null, "settings");
            }
        } catch (error) {
            alert("Ошибка: ", error);
            console.log("Error status: ", error);
        }
        window.store.setState({ isLoading: false });
    }

    public async changePassword(dataToValidate: Array<string | boolean>, eventType: string) {
        const submit = new FormSubmit(...dataToValidate);
        const api = new UsersApi();
        // const res = await api.userInfo();

        try {
            if (submit.validated && eventType === "click") {
                window.store.setState({ isLoading: true });
                const result = await api.changeUserPassword(submit.userData);
                
                if (result.status !== 200) {
                    throw new Error(result.status);
                }

                switchPage(null, "settings");
            }
        } catch (error) {
            alert("Ошибка: ", error);
            console.log(error);
        }

        window.store.setState({ isLoading: false });

        // Mas42er92s
        // mas42er92S
    }

    public async setAvatar(avatar) {
        const api = new UsersApi();
        const response = await api.setUserAvatar(avatar);
        const result = JSON.parse(response.response);
        const image = Object.entries(result).filter((prop) => prop[0] === "avatar")[0][1];
        const imageLink = "https://ya-praktikum.tech/api/v2/resources/" + image;
        window.store.setState({ imageLink })

        console.log(res.response);
    }

    public async getUserInfo() {
        const api = new UsersApi();
        return api.userInfo();
    }
} 
