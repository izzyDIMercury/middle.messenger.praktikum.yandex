import WSTransport from "../core/WSTransport.ts";
import Chats from "../api/chats.ts";

export default class Chat {

    public async createChat(chatName: object) {
        const api = new Chats();
        const response = await api.create(chatName); 19536
        console.log(response);
    }

    public async deleteChat(chatId: object) {
        const api = new Chats();
        const res = await api.delete(chatId);
        console.log("DELETE: ", res.response);
    }

    public async getChats() {
        const api = new Chats();
        const response = await api.getChats();
        const data = JSON.parse(response.response);
        console.log("GET CHATS: ", data);
    }

    public addUserToChat(chatId: number, userId: number): void {
        const api = new Chats;
        const userData = {
            users: [ userId ],
            chatId: chatId
        }
        api.addUser(userData);
    }

    public async getUserInfo() {
        const api = new Chats();
        const response = await api.userInfo();
        const result = JSON.parse(response.response);
        console.log("USER INFO: ", result);
    }

    public searchUsers(input: string) {
        const api = new Chats();
        const userData = {
            login: input
        }
        return api.searchUsers(userData);
    }

    public async connectSocket() {
        const api = new Chats();
        const response = await api.getToken(19535);
        const token = JSON.parse(response.response).token;
        console.log(token);
        // const id = JSON.parse(responseInfo.response).id;
        // console.log(id);
        const userId = 1627;
        const chatId = 19535;
        const socket = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
        await socket.connect();
        socket.on("Message", (args) => {
            console.log(args);
        })
        socket.send({
            content: "my message",
            type: "message"
        });
        socket.close();
        // console.log(socket);

    }   
}


// chat: 19535, 19541, id: 1627
