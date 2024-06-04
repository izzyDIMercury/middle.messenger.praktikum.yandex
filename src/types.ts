// type EventProp = { [key: string]: Function };

// // type Ing = { [key: string]: Function };

// export type Props = Record<string, string | EventProp>;

type PropsFunction = {
    [key: string]: Function
}

type PropsFunction2 = {
    [key: string]: any

}

type Props = {
    [key: string]: string | Function | { [key: string]: Function }
}

type UserData = Record<string, string>;

export type { Props, UserData }
