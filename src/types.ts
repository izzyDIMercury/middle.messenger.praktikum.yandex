

type UserData = Record<string, string | FormData >;

type ComponentProps = {
    [key: string]: string | { [key: string]: Function };
};

type User = {
    id: number
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

type StoreType = {
    isLoading: boolean,
    isError: boolean,
    imageLink: string,
    usersFound: User[],
    chats: object,
    length: number,
    activeChat: {
        chat: object,
        isActive: boolean
    }
    currentMessage: string,
    doFillProps: boolean,
    userInfo: UserInfo,
    defaultChatSelected: boolean
}

export type { ComponentProps, UserData, StoreType };
