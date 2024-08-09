import HTTPTransport from "../core/request.ts";

export default class AuthApi {

    private host: string = "https://ya-praktikum.tech/api/v2";
    private HTTP: any = new HTTPTransport();

    public async login(userData: object) {
        return this.HTTP.post(`${this.host}/auth/signin`, {
            data: userData,
            headers: {
                ["content-type"]: "application/json"
            }
        });
    }

    public async register(userData: object) {
        console.log(userData);
        return this.HTTP.post(`${this.host}/auth/signup`, {
            data: userData,
            headers: {
                ["content-type"]: "application/json"
            }
        });
    }

    public async logout() {
        return this.HTTP.post(`${this.host}/auth/logout`, {});
    }

    public async userInfo() {
        return this.HTTP.get(`${this.host}/auth/user`, {});
    }
}
