import HTTPTransport from "../core/request.ts";
import type { HTTP, UserData } from "../types.ts";

// type RequestData = Record<string, any>

export default class UsersApi {

    private host: string = "https://ya-praktikum.tech/api/v2";
    private HTTP: HTTP = new HTTPTransport();

    public async logout() {
        return this.HTTP.post(`${this.host}/auth/logout`, {
            handler: "settings logout"
        });
    }

    public async changeUserData(userData: UserData) {
        return this.HTTP.put(`${this.host}/user/profile`, {
            data: userData,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    public async changeUserPassword(userData: UserData) {
        return this.HTTP.put(`${this.host}/user/password`, {
            data: userData
        })
    }

    public async setUserAvatar(avatar: UserData) {
        return this.HTTP.put(`${this.host}/user/profile/avatar`, {
            data: avatar
        });
    }

    public async userInfo() {
        return this.HTTP.get(`${this.host}/auth/user`, {});
    }
}

// headers: {
//     "Content-Type": "multipart/form-data"
// }
