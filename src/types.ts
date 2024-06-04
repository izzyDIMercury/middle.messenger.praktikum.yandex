// type EventProp = { [key: string]: Function };

// // type Ing = { [key: string]: Function };

// export type Props = Record<string, string | EventProp>;

type PropsFunction = {
    [key: string]: () => void
}

type PropsFunction2 = {
    [key: string]: any

}

type FuncVoid = () => void;

interface Props {
    [key: string]: string | PropsFunction | boolean
}

type UserData = Record<string, string>;

export type { Props, UserData }
