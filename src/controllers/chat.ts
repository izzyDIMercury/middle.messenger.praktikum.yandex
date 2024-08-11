import WSTransport from "../core/WSTransport.ts";
import Chats from "../api/chats.ts";
import { UserType } from "../types.ts";

// type RequestData = {
//     [key: string]: string | number | object | [];
// }

type Response = {
    status: number,
    response: string
}

type ChatType = {
    avatar: string | null,
    id: number,
    title: string,
    last_message: object
}

export default class Chat {

    public async uploadChatAvatar(form: FormData) {
        const api = new Chats();
        const response = await api.uploadChatAvatar(form);
        if (response.status === 200) {
            this.getChats();
        }
    }

    public getLastMessage() {
        const api = new Chats();
        return api.getChats();
    }

    public async getUserInfo() {
        const api = new Chats();
        return api.userInfo();
    }

    public async createChat(chatName: string) {
        const api = new Chats();
        try {
            const requestData = {
                title: chatName
            }
            const response = await api.create(requestData);
            if (response.status !== 200) {
                throw new Error(JSON.parse(response.response));
            }
            this.getChats();
        } catch (error) {
            console.log("Create char error: ", error);
        }
    }

    public async addUserToChat(userId: number, users: UserType[]) {
        const api = new Chats();
        //@ts-expect-error window problem
        const chatId = window.store.getState().activeChat.id;
        // console.log(chatId);
        const requestData = {
            users: [ userId ],
            chatId: chatId
        };

        console.log(users);
        let found: boolean = false;
        users.forEach((user: UserType) => {
            if (userId === user.id) {
                found = true;
            }
        })

        if (!found) {
            await api.addUser(requestData);
            this.getChats();
        }
    }

    public async deleteUserFromChat(userId: number) {
        const api = new Chats();
        //@ts-expect-error window problem
        const chatId = window.store.getState().activeChat.id;
        const requestData = {
            users: [ userId ],
            chatId: chatId
        };
        await api.deleteUserFromChat(requestData);
        this.getChats();
    }

    public async deleteChat(chatId: number) {
        const api = new Chats();
        try {
            const response = await api.deleteChat({ chatId }) as Response;
            if (response.status !== 200) {
                throw new Error(JSON.parse(response.response))
            }
            this.getChats(true);
        } catch (error) {
            console.log("Delete chat error: ", error);
        }
    }

    public async getChats(clickFirstChild?: boolean) {
        const api = new Chats();

        try {
            const responseChats = await api.getChats();
            const dataChats = JSON.parse(responseChats.response);
            if (responseChats.status !== 200) {
                throw new Error(dataChats);
            }
            const promises = dataChats.map((chat: ChatType) => {
                return new Promise((resolve) => {
                    const response = api.getChatUsers(chat.id);
                    response.then(result => {
                        const users = JSON.parse(result.response);
                        const finalChat = {
                            id: chat.id,
                            title: chat.title,
                            avatar: chat.avatar,
                            lastMessage: chat.last_message,
                            users: users
                        }
                        resolve(finalChat);
                    })
                })
            })
            Promise.all(promises).then(values => {
                const chats: Record<number, ChatType> = {};
                values.forEach(value => {
                    chats[value.id] = value;
                })
                //@ts-expect-error window behavior
                window.store.setState({ chats });
                //@ts-expect-error window behavior
                const activeChatId = window.store.getState().activeChat.id;
                const child = document.querySelector(`li[chatId="${activeChatId}"]`)
                if (child instanceof HTMLElement && child !== null && !clickFirstChild) {
                    child.click();
                } else {
                    const container = document.querySelector(".left-column__users");
                    const element = container?.firstChild;
                    if (element instanceof HTMLElement) {
                        element.click();
                    }
                }
            })
        } catch (error) {
            console.log("Get chats error: ", error);
        }
    }

    public searchUsers(input: string) {
        const api = new Chats();
        const userData = {
            login: input
        }
        return api.searchUsers(userData);
    }

    public async connectSocket(chatId: number) {
        const api = new Chats();
        try {
            const tokenResponse = await api.getToken(chatId);
            if (tokenResponse.status !== 200) {
                throw new Error(JSON.parse(tokenResponse.response));
            }
            const token = JSON.parse(tokenResponse.response).token;
            const infoResponse = await api.userInfo();
            if (infoResponse.status !== 200) {
                throw new Error(JSON.parse(infoResponse.response));
            }
            const userInfo = JSON.parse(infoResponse.response);
            const userId = userInfo.id;
            const socket = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
            await socket.connect();
            return socket;
        } catch (error) {
            console.log("Connect socket error: ", error);
        }
    }

    public async setGlobalUserInfo() {
        const api = new Chats();
        try {
            const response = await api.userInfo();
            const info = JSON.parse(response.response);
            if (response.status !== 200) {
                throw new Error(info);
            }
            //@ts-expect-error can't properly type window.store
            window.store.setState({ userInfo: info })
        } catch (error) {
            console.log("Set global info error: ", error);
        }
    } 
}


// chat: 19535, 19541, id: 1627


