

type UserData = Record<string, string | FormData >;

type ComponentProps = {
    [key: string]: string | { [key: string]: Function };
};

type User = {
    id: number
    first_name: string,
    second_name: string,
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
    doFillProps: boolean
}

export type { ComponentProps, UserData, StoreType };
