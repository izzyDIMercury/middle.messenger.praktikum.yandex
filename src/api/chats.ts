import HTTPTransport from "../core/request.ts";
import type { HTTP, UserData } from "../types.ts";
import { BASE_URL } from "../constants.ts";

// type RequestData = {
//     [key: string]: string | number | object | [];
// }

export default class ChatsApi {

    private HTTP: HTTP = new HTTPTransport();

    // public async connect(userData: RequestData) {
    //     return this.HTTP.post(`${this.host}/token`)
    // }

    public archiveChat(chatData: UserData) {
        return this.HTTP.post(`${BASE_URL}/chats/archive`, {
            data: chatData,
            headers: {
                ["content-type"]: "application/json"
            }
        })
    }

    public getArchivedChats() {
        return this.HTTP.get(`${BASE_URL}/chats/archive`, {})
    }

    public async create(userData: UserData) {
        return this.HTTP.post(`${BASE_URL}/chats`, {
            data: userData,
            headers: {
                ["content-type"]: "application/json"
            }
        })
    }

    public async deleteUserFromChat(chatData: UserData) {
        return this.HTTP.delete(`${BASE_URL}/chats/users`, {
            data: chatData,
            headers: {
                ["content-type"]: "application/json"
            }
        });
    }

    public async deleteChat(chatData: UserData) {
        return this.HTTP.delete(`${BASE_URL}/chats`, {
            data: chatData,
            headers: {
                ["content-type"]: "application/json"
            }
        })
    }

    public searchUsers(userData: UserData) {
        return this.HTTP.post(`${BASE_URL}/user/search`, {
            data: userData,
            headers: {
                ["content-type"]: "application/json"
            }
        })
    }

    public async getChats() {
        return this.HTTP.get(`${BASE_URL}/chats`, {})
    }

    public async userInfo() {
        return this.HTTP.get(`${BASE_URL}/auth/user`, {});
    }

    public async getToken(chatId: number) {
        return this.HTTP.post(`${BASE_URL}/chats/token/${chatId}`, {
            headers: {
                ["content-type"]: "application/json"
            }
        });
    }

    public addUser(userData: UserData) {
        return this.HTTP.put(`${BASE_URL}/chats/users`, {
            data: userData,
            headers: {
                ["content-type"]: "application/json"
            }
        });
    }

    public async getChatUsers(chatId: number) {
        return await this.HTTP.get(`${BASE_URL}/chats/${chatId}/users`, {});
    }

    public async uploadChatAvatar(form: UserData) {
        return await this.HTTP.put(`${BASE_URL}/chats/avatar`, {
            data: form
        });
    }
}
