import WSTransport from "../core/WSTransport.ts";
import Chats from "../api/chats.ts";
import { GlobalStore } from "../store.ts";

type RequestData = {
    [key: string]: string | number | object | [];
}

export default class Chat {

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


        // this.deleteChat({ chatId: 19752 });

        // const resp = await api.getChats(1672);
        // const myChats = JSON.parse(resp.response);
        // console.log(myChats);

        // const state = window.store.getState();
        // console.log(state);
    }

    public async deleteChat(chatId: number) {
        const api = new Chats();
        const res = await api.deleteChat({ chatId });
        console.log("DELETE: ", res.response);
        // const chatsResp = await api.getChats();
        // const result = JSON.parse(chatsResp.response);
        // console.log(result);
        this.getChats();
        // GlobalStore.setState({
        //     defaultChatSelected: false
        // })
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
        dataChats.forEach((chat: { id: number }) => {
    
            const responseUser = api.getChatUsers(chat.id);

            responseUser.then((response: { response: string }) => {
                const user = JSON.parse(response.response).filter((user: { id: number }) => user.id !== currentUserID)[0];
                // const chats = GlobalStore.getState().chats;
                const id = chat.id;
                myChats[id] = { chat, user }
                // chats[chat.id] = { chat, user };
                //
                //
                const length = Object.keys(myChats).length;
                console.log(myChats)
                GlobalStore.setState({ chats: myChats, length });

                const container = document.querySelector(".left-column__users");
                const child = container?.firstChild;
                if (child instanceof HTMLElement) {
                    child.click();
                }
            })
        })
        // setTimeout(() => {
        //     window.store.setState({ chatListUpdated: false });
        // }, 1000);
    }

    // public async getUserInfo() {
    //     const api = new Chats();
    //     return api.userInfo();
    // }

    public searchUsers(input: string) {
        const api = new Chats();
        const userData = {
            login: input
        }
        return api.searchUsers(userData);
    }

    public async connectSocket(chatId: number) {
        const api = new Chats();
        const tokenResponse = await api.getToken(19535);
        const token = JSON.parse(tokenResponse.response).token;
        const infoResponse = await api.userInfo();
        const userInfo = JSON.parse(infoResponse.response);
        const userId = userInfo.id;
        const socket = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
        await socket.connect();
        return socket;
        // socket.on("Message", (args) => {
        //     console.log(args);
        // })
        // socket.send({
        //     content: "my message",
        //     type: "message"
        // });
        // socket.close();
        // console.log(socket);

    }

    public async setGlobalUserInfo() {
        const api = new Chats();
        const response = await api.userInfo();
        const info = JSON.parse(response.response);
        GlobalStore.setState({ userInfo: info })
        // setTimeout(() => {
        //     console.log("SET INFO: ", GlobalStore.getState());
        // }, 1000);
        // console.log("USER INFO: ", info)
    } 
}


// chat: 19535, 19541, id: 1627
