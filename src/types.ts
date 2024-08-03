

type UserData = Record<string, string | FormData >;

type ComponentProps = {
    [key: string]: string | { [key: string]: Function };
};

export type { ComponentProps, UserData };
