import FormSubmit from "../core/formSubmit.ts";
import UsersApi from "../api/users.ts";
import { switchPage } from "../core/utils.ts";
import { GlobalStore } from "../store.ts";

export default class SettingsController {

    public async logout() {
        GlobalStore.setState({ isLoading: true })
        const api = new UsersApi();
        const result: { response: string } = await api.logout() as { response: string };
        console.log("LOGOUT: ", result.response);
        switchPage(null, "");
        GlobalStore.setState({ isLoading: false })
        location.reload();
    }

    public async changeProfile(formClass: string, errorClass: string, isMessage?: boolean, eventType?: string) {
        const submit = new FormSubmit(formClass, errorClass, isMessage, eventType);
        const api = new UsersApi();

        try {
            if (submit.validated && eventType === "click") {

                GlobalStore.setState({ isLoading: true });
                const result = await api.changeUserData(submit.userData) as { status: number };

                if (result.status !== 200) {
                    throw new Error(String(result.status));
                }

                switchPage(null, "settings");
            }
        } catch (error) {
            alert(error);
            console.log("Error status: ", error);
        }
        GlobalStore.setState({ isLoading: false });
    }

    public async changePassword(formClass: string, errorClass: string, isMessage?: boolean, eventType?: string) {
        const submit = new FormSubmit(formClass, errorClass, isMessage, eventType);
        const api = new UsersApi();
        // const res = await api.userInfo();

        try {
            if (submit.validated && eventType === "click") {
                GlobalStore.setState({ isLoading: true });
                const result = await api.changeUserPassword(submit.userData) as { status: number };
                
                if (result.status !== 200) {
                    throw new Error(String(result.status));
                }

                switchPage(null, "settings");
            }
        } catch (error) {
            alert(error);
            console.log(error);
        }

        GlobalStore.setState({ isLoading: false });

        // Mas42er92s
        // mas42er92S
    }

    public async setAvatar(avatar: object) {
        const api = new UsersApi();
        const response = await api.setUserAvatar(avatar) as { response: string };
        const result = JSON.parse(response.response);
        const image = Object.entries(result).filter((prop) => prop[0] === "avatar")[0][1];
        const imageLink = "https://ya-praktikum.tech/api/v2/resources/" + image;
        GlobalStore.setState({ imageLink })
    }

    public async getUserInfo() {
        const api = new UsersApi();
        return api.userInfo();
    }
} 
