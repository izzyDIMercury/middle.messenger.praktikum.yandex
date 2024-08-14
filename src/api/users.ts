import HTTPTransport from "../core/request.ts";
import type { HTTP, UserData } from "../types.ts";
import { BASE_URL } from "../constants.ts";

// type RequestData = Record<string, any>

export default class UsersApi {

    private HTTP: HTTP = new HTTPTransport();

    public async logout() {
        return this.HTTP.post(`${BASE_URL}/auth/logout`, {
            handler: "settings logout"
        });
    }

    public async changeUserData(userData: UserData) {
        return this.HTTP.put(`${BASE_URL}/user/profile`, {
            data: userData,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    public async changeUserPassword(userData: UserData) {
        return this.HTTP.put(`${BASE_URL}/user/password`, {
            data: userData
        })
    }

    public async setUserAvatar(avatar: UserData) {
        return this.HTTP.put(`${BASE_URL}/user/profile/avatar`, {
            data: avatar
        });
    }

    public async userInfo() {
        return this.HTTP.get(`${BASE_URL}/auth/user`, {});
    }
}

// headers: {
//     "Content-Type": "multipart/form-data"
// }
