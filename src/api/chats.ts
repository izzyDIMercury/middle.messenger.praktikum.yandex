import HTTPTransport from "../core/request.ts";

type RequestData = Record<string, string>;

export default class ChatsApi {

    private host: string = "https://ya-praktikum.tech/api/v2";
    private HTTP: any = new HTTPTransport();

    public async connect(userData) {
        return this.HTTP.post(`${this.host}/token`)
    }

    public async create(userData: object) {
        return this.HTTP.post(`${this.host}/chats`, {
            data: userData,
            headers: {
                ["content-type"]: "application/json"
            }
        })
    }

    public async deleteChat(chatData: RequestData) {
        return this.HTTP.delete(`${this.host}/chats`, {
            data: chatData,
            headers: {
                ["content-type"]: "application/json"
            }
        })
    }

    public searchUsers(userData: RequestData) {
        console.log(userData)
        return this.HTTP.post(`${this.host}/user/search`, {
            data: userData,
            headers: {
                ["content-type"]: "application/json"
            }
        })
    }

    public async getChats() {
        return this.HTTP.get(`${this.host}/chats`, {})
    }

    public async userInfo() {
        return this.HTTP.get(`${this.host}/auth/user`, {});
    }

    public async getToken(chatId: number) {
        return this.HTTP.post(`${this.host}/chats/token/${chatId}`, {
            headers: {
                ["content-type"]: "application/json"
            }
        });
    }

    public addUser(userData: object) {
        return this.HTTP.put(`${this.host}/chats/users`, {
            data: userData,
            headers: {
                ["content-type"]: "application/json"
            }
        });
    }

    public getChatUsers(chatId: number) {
        return this.HTTP.get(`${this.host}/chats/${chatId}/users`, {});
    }
}
