import HTTPTransport from "../core/request.ts";

type RequestData = Record<string, any>

export default class UsersApi {

    private host: string = "https://ya-praktikum.tech/api/v2";
    private HTTP = new HTTPTransport();

    public async logout() {
        return this.HTTP.post(`${this.host}/auth/logout`, {
            handler: "settings logout"
        });
    }

    public async changeUserData(userData: RequestData) {
        return this.HTTP.put(`${this.host}/user/profile`, {
            data: userData,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    public async changeUserPassword(userData: RequestData) {
        return this.HTTP.put(`${this.host}/user/password`, {
            data: userData
        })
    }

    public async setUserAvatar(avatar: RequestData) {
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
