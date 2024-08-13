

type UserData = Record<string, string | FormData >;

type ComponentProps = {
    [key: string]: string | { [key: string]: Function };
};

type Options = {
    headers?: {
        [key: string]: string
    },
    method?: string,
    timeout?: number,
    handler?: string,
    data?: UserData;
}

type HTTP = {
    post: (url: string, options: Options) => Promise<XMLHttpRequest>;
    put: (url: string, options: Options) => Promise<XMLHttpRequest>
    get: (url: string, options: Options) => Promise<XMLHttpRequest>
    delete: (url: string, options: Options) => Promise<XMLHttpRequest>
};

type UserType = {
    id: number,
    login: string,
    first_name: string,
    second_name: string,
}

type UserInfo = {
    avatar: string | null,
    display_name: string | null,
    email: string | null,
    first_name: string | null,
    id: number | null,
    login: string | null,
    phone: string | null,
    second_name: string | null
}

type MessageType = { messeges: string[] }

type UserMessage = {
    user_id: number,
    content: string
}

type StoreType = {
    isLoading: boolean,
    isError: boolean,
    imageLink: string,
    usersFound: UserType[],
    chats: object,
    length: number,
    activeChat: {
        chat: {
            id: number
        },
        isActive: boolean,
        id: number,
        users: UserType[],
        title: string,
        messages: UserMessage[]
    }
    communication: Record<string, MessageType>,
    currentMessage: string,
    doFillProps: boolean,
    userInfo: UserInfo,
    defaultChatSelected: boolean,
    messagesCount: number,
    activeChatId: number,
    modalOpened: boolean,
    chatSettingsOpened: boolean
}

export type { ComponentProps, UserData, StoreType, UserInfo, UserType, UserMessage, HTTP };
