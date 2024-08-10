import WSTransport from "../core/WSTransport.ts";
import Chats from "../api/chats.ts";
// import { GlobalStore } from "../store.ts";

type RequestData = {
    [key: string]: string | number | object | [];
}

type Response = {
    status: number,
    response: string
}

export default class Chat {

    public getLastMessage() {
        const api = new Chats();
        return api.getChats();
    }

    public async getUserInfo() {
        const api = new Chats();
        return api.userInfo();
    }

    public async createChat(chatName: RequestData) {
        const api = new Chats();
        try {
            const response = await api.create(chatName);
            if (response.status !== 200) {
                throw new Error(JSON.parse(response.response));
            }
        } catch (error) {
            console.log("Create char error: ", error);
        }
    }

    public async createChatWithUser(userId: number) {
        const api = new Chats();
        try {
            const response = await api.create({ title: "mychat3" });
            const chat = JSON.parse(response.response);
            if (response.status !== 200) {
                throw new Error(chat)
            }
            const chatId = chat.id;
            const request = {
                users: [ userId ],
                chatId: chatId
            };
            console.log(request);
            await api.addUser(request);
            this.getChats();
        } catch (error) {
            console.log("Create 2 users chat error: ", error);
        }
    }

    public async deleteChat(chatId: number) {
        const api = new Chats();
        try {
            const response = await api.deleteChat({ chatId }) as Response;
            if (response.status !== 200) {
                throw new Error(JSON.parse(response.response))
            }
            this.getChats();
        } catch (error) {
            console.log("Delete chat error: ", error);
        }
    }

    public async getChats() {
        const api = new Chats();

        try {
            const responseInfo = await api.userInfo();
            const userInfo = JSON.parse(responseInfo.response);
            if (responseInfo.status !== 200) {
                throw new Error(userInfo);
            }
            const currentUserID = userInfo.id;

            const responseChats = await api.getChats();
            const dataChats = JSON.parse(responseChats.response);
            if (responseChats.status !== 200) {
                throw new Error(dataChats);
            }
            const myChats: Record<number, {}> = {}
            dataChats.forEach((chat: { id: number, last_message: object }) => {
        
                const responseUser = api.getChatUsers(chat.id);

                responseUser.then((response: { response: string }) => {
                    const user = JSON.parse(response.response).filter((user: { id: number }) => user.id !== currentUserID)[0];
                    const id = chat.id;
                    myChats[id] = { chat, user, lastMessage: chat.last_message  }
                    const length = Object.keys(myChats).length;
                    //@ts-expect-error can't properly type window.store
                    window.store.setState({ chats: myChats, length });

                    const container = document.querySelector(".left-column__users");
                    const child = container?.firstChild;
                    if (child instanceof HTMLElement) {
                        child.click();
                    }
                })
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


// public async getChats() {
//     const api = new Chats();
//     const responseInfo = await api.userInfo();
//     const userInfo = JSON.parse(responseInfo.response);


//     const currentUserID = userInfo.id;

//     const responseChats = await api.getChats();
//     const dataChats = JSON.parse(responseChats.response);
//     // console.log(dataChats);
//     const myChats: Record<number, {}> = {}
//     dataChats.forEach((chat: { id: number, last_message: object }) => {

//         const responseUser = api.getChatUsers(chat.id);

//         responseUser.then((response: { response: string }) => {
//             const user = JSON.parse(response.response).filter((user: { id: number }) => user.id !== currentUserID)[0];
//             const id = chat.id;
//             myChats[id] = { chat, user, lastMessage: chat.last_message  }
//             const length = Object.keys(myChats).length;
//             //@ts-expect-error can't properly type window.store
//             window.store.setState({ chats: myChats, length });

//             const container = document.querySelector(".left-column__users");
//             const child = container?.firstChild;
//             if (child instanceof HTMLElement) {
//                 child.click();
//             }
//         })
//     })
// }
