import FormSubmit from "../core/formSubmit.ts";
import UsersApi from "../api/users.ts";
import { switchPage } from "../core/utils.ts";
// import { GlobalStore } from "../store.ts";

type Response = {
    status: number,
    response: string
}

export default class SettingsController {

    public async logout() {
        try {
            //@ts-expect-error can't properly type window.store
            window.store.setState({ isLoading: true })
            const api = new UsersApi();
            const response = await api.logout() as Response;
            if (response.status !== 200) {
                throw new Error(JSON.parse(response.response))
            }
            switchPage(null, "");
            //@ts-expect-error can't properly type window.store
            window.store.setState({ isLoading: false })
            location.reload();
        } catch (error) {
            console.log("Logout error: ", error);
        }
    }

    public async changeProfile(formClass: string, errorClass: string, isMessage?: boolean, eventType?: string) {
        const submit = new FormSubmit(formClass, errorClass, isMessage, eventType);
        const api = new UsersApi();

        try {
            if (submit.validated && eventType === "click") {
                //@ts-expect-error can't properly type window.store
                window.store.setState({ isLoading: true });
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
        //@ts-expect-error can't properly type window.store
        window.store.setState({ isLoading: false });
    }

    public async changePassword(formClass: string, errorClass: string, isMessage?: boolean, eventType?: string) {
        const submit = new FormSubmit(formClass, errorClass, isMessage, eventType);
        const api = new UsersApi();
        // const res = await api.userInfo();

        try {
            if (submit.validated && eventType === "click") {
                //@ts-expect-error can't properly type window.store
                window.store.setState({ isLoading: true });
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
        //@ts-expect-error can't properly type window.store
        window.store.setState({ isLoading: false });

        // Mas42er92s
        // mas42er92S
    }

    public async setAvatar(avatar: object) {
        const api = new UsersApi();

        try {
            const response = await api.setUserAvatar(avatar) as Response;
            const result = JSON.parse(response.response);
            if (response.status !== 200) {
                throw new Error(result);
            }
            const image = Object.entries(result).filter((prop) => prop[0] === "avatar")[0][1];
            const imageLink = "https://ya-praktikum.tech/api/v2/resources/" + image;
            //@ts-expect-error can't properly type window.store
            window.store.setState({ imageLink })
        } catch (error) {
            console.log("Set avatar error: ", error);
        }
    }

    public async getUserInfo() {
        const api = new UsersApi();
        return api.userInfo();
    }
} 
