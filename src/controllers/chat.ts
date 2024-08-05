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
        const responseInfo = await api.userInfo();
        const currentUserID = JSON.parse(responseInfo.response).id;

        const responseChats = await api.getChats();
        const dataChats = JSON.parse(responseChats.response);
        dataChats.forEach((chat: object) => {
    
            const responseUser = api.getChatUsers(chat.id);

            responseUser.then((response: object) => {
                const user = JSON.parse(response.response).filter((user: object) => user.id !== currentUserID)[0];
                const chats = window.store.getState().chats;
                chats[chat.id] = { chat, user };
                window.store.setState({ chats });
            })
        })
        console.log("CHATS IN STATE: ", window.store.getState().chats);
    }

    // public async getChatUsers2(chatId: number) {
    //     const api = new Chats();
    //     const response = await api.getChatUsers(chatId);
    //     // const result = JSON.parse(response.response);
    //     return response;
    // }

    // public addUserToChat(chatId: number): void {
    //     const api = new Chats;
    //     // const userData = {
    //     //     users: [ userId ],
    //     //     chatId: chatId
    //     // }
    //     // api.addUser(userData);
    //     return api.getChatUsers(chatId);
    // }

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
