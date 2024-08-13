import HTTPTransport from "../core/request.ts";
import type { HTTP, UserData } from "../types.ts";

// type RequestData = {
//     [key: string]: string | number | object | [];
// }

export default class ChatsApi {

    private host: string = "https://ya-praktikum.tech/api/v2";
    private HTTP: HTTP = new HTTPTransport();

    // public async connect(userData: RequestData) {
    //     return this.HTTP.post(`${this.host}/token`)
    // }

    public archiveChat(chatData: UserData) {
        return this.HTTP.post(`${this.host}/chats/archive`, {
            data: chatData,
            headers: {
                ["content-type"]: "application/json"
            }
        })
    }

    public getArchivedChats() {
        return this.HTTP.get(`${this.host}/chats/archive`, {})
    }

    public async create(userData: UserData) {
        return this.HTTP.post(`${this.host}/chats`, {
            data: userData,
            headers: {
                ["content-type"]: "application/json"
            }
        })
    }

    public async deleteUserFromChat(chatData: UserData) {
        return this.HTTP.delete(`${this.host}/chats/users`, {
            data: chatData,
            headers: {
                ["content-type"]: "application/json"
            }
        });
    }

    public async deleteChat(chatData: UserData) {
        return this.HTTP.delete(`${this.host}/chats`, {
            data: chatData,
            headers: {
                ["content-type"]: "application/json"
            }
        })
    }

    public searchUsers(userData: UserData) {
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

    public addUser(userData: UserData) {
        return this.HTTP.put(`${this.host}/chats/users`, {
            data: userData,
            headers: {
                ["content-type"]: "application/json"
            }
        });
    }

    public async getChatUsers(chatId: number) {
        return await this.HTTP.get(`${this.host}/chats/${chatId}/users`, {});
    }

    public async uploadChatAvatar(form: UserData) {
        return await this.HTTP.put(`${this.host}/chats/avatar`, {
            data: form
        });
    }
}
