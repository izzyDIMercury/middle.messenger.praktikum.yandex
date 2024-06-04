
// interface Props {
//     [key: string]: string | PropsFunction | boolean
// }

type UserData = Record<string, string>;

type ComponentProps = {
    [key: string]: string | { [key: string]: Function };
}

export type { ComponentProps, UserData }
