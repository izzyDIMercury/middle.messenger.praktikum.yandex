
// interface Props {
//     [key: string]: string | PropsFunction | boolean
// }

type UserData = Record<string, string>;

type Props = {
    [key: string]: string | { [key: string]: Function };
}

export type { Props, UserData }
