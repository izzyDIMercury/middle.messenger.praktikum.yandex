

type UserData = Record<string, string>;

type ComponentProps = {
    [key: string]: string | { [key: string]: Function };
};

export type { ComponentProps, UserData };
