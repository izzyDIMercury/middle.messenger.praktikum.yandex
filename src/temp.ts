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
        // console.log("chats: ", dataChats)
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
