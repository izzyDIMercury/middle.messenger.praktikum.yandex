import HTTPTransport from "../core/request.ts";
import type { HTTP, UserData } from "../types.ts";
import { BASE_URL } from "../constants.ts";

export default class AuthApi {
    private HTTP: HTTP = new HTTPTransport();

    public async login(userData: UserData) {
        return this.HTTP.post(`${BASE_URL}/auth/signin`, {
            data: userData,
            headers: {
                ["content-type"]: "application/json"
            }
        });
    }

    public async register(userData: UserData) {
        console.log(userData);
        return this.HTTP.post(`${BASE_URL}/auth/signup`, {
            data: userData,
            headers: {
                ["content-type"]: "application/json"
            }
        });
    }

    public async logout() {
        return this.HTTP.post(`${BASE_URL}/auth/logout`, {});
    }

    public async userInfo() {
        return this.HTTP.get(`${BASE_URL}/auth/user`, {});
    }
}
