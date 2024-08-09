import WSTransport from "../core/WSTransport.ts";
import Chats from "../api/chats.ts";
// import { GlobalStore } from "../store.ts";

type RequestData = {
    [key: string]: string | number | object | [];
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
        const response = await api.create(chatName); 19536
        console.log(response);
    }

    public async createChatWithUser(userId: number) {
        const api = new Chats();
        const response = await api.create({ title: "mychat3" });
        const chat = JSON.parse(response.response);
        const chatId = chat.id;
        const request = {
            users: [ userId ],
            chatId: chatId
        };
        console.log(request);
        await api.addUser(request);
        this.getChats();
    }

    public async deleteChat(chatId: number) {
        const api = new Chats();
        await api.deleteChat({ chatId });
        // console.log("DELETE: ", res.response);
        this.getChats();
    }

    public async getChats() {
        const api = new Chats();
        const responseInfo = await api.userInfo();
        const userInfo = JSON.parse(responseInfo.response);
        const currentUserID = userInfo.id;

        const responseChats = await api.getChats();
        const dataChats = JSON.parse(responseChats.response);
        // console.log(dataChats);
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
        const tokenResponse = await api.getToken(chatId);
        const token = JSON.parse(tokenResponse.response).token;
        const infoResponse = await api.userInfo();
        const userInfo = JSON.parse(infoResponse.response);
        const userId = userInfo.id;
        const socket = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
        await socket.connect();
        return socket;

    }

    public async setGlobalUserInfo() {
        const api = new Chats();
        const response = await api.userInfo();
        const info = JSON.parse(response.response);
        //@ts-expect-error can't properly type window.store
        window.store.setState({ userInfo: info })
    } 
}


// chat: 19535, 19541, id: 1627
