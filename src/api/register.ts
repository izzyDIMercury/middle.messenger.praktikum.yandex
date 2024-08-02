import HTTPTransport from "../core/request.ts";

export default class RegisterApi {

    private host: string = "https://ya-praktikum.tech/api/v2";

    public async request(userData) {
        const HTTP = new HTTPTransport();
        return HTTP.post(`${this.host}/auth/signup`, {
            data: userData,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}
