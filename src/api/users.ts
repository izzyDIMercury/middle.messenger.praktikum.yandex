import HTTPTransport from "../core/request.ts";

export default class UsersApi {

    private host: string = "https://ya-praktikum.tech/api/v2";
    private HTTP = new HTTPTransport();

    public async logout() {
        return this.HTTP.post(`${this.host}/auth/logout`, {});
    }

    public async changeUserData(userData) {
        return this.HTTP.put(`${this.host}/user/profile`, {
            data: userData,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    public async changeUserPassword(userData) {
        return this.HTTP.put(`${this.host}/user/password`, {
            data: userData,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    public async setUserAvatar(avatar) {
        return this.HTTP.put(`${this.host}/user/profile/avatar`, {
            data: avatar,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }

    public async userInfo() {
        return this.HTTP.get(`${this.host}/auth/user`, {});
    }
}
