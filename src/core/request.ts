import type { UserData } from "../types.js";

type Options = {
    headers?: {
        [key: string]: string
    },
    method?: string,
    timeout?: number,
    handler?: string,
    data?: UserData;
};

type HTTPMethod = (url: string, options: Options) => Promise<XMLHttpRequest>
type HTTPRequest = (url: string, options: Options, timeout: number | undefined) => Promise<XMLHttpRequest>

interface HTTPType {
    get: HTTPMethod,
    post: HTTPMethod,
    put: HTTPMethod,
    delete: HTTPMethod,
    request: HTTPRequest
}

export default class HTTPTransport implements HTTPType {
    static readonly GET = "GET";

    static readonly POST = "POST";

    static readonly PUT = "PUT";

    static readonly DELETE = "DELETE";

    private stringify(userData: UserData) {
        if (typeof userData !== "object") {
            throw new Error("Data must be object!");
        }

        const keys = Object.keys(userData);
        return keys.reduce((result, key, index) => `${result}${key}=${userData[key]}${index < keys.length - 1 ? "&" : ""}`, "?");
    }

    public get: HTTPMethod = (url, options) => {
        return this.request(url, { ...options, method: HTTPTransport.GET }, options.timeout);
    }

    public post: HTTPMethod = (url, options) => {
        return this.request(url, { ...options, method: HTTPTransport.POST }, options.timeout);
    }

    public put: HTTPMethod = (url, options) => {
        return this.request(url, { ...options, method: HTTPTransport.PUT }, options.timeout);
    }

    public delete: HTTPMethod =(url, options) => {
        return this.request(url, { ...options, method: HTTPTransport.DELETE }, options.timeout);
    }

    public request: HTTPRequest = (url, options, timeout = 3000) => {
        const { headers = {}, method, data } = options;
        const self = this;

        return new Promise<XMLHttpRequest>((resolve, reject) => {
            if (!method) {
                reject("No method");
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === HTTPTransport.GET;
            xhr.withCredentials = true;

            xhr.open(
                method,
                isGet && !!data
                    ? `${url}${self.stringify(data)}`
                    : url
            );

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            // isGet || 

            if (!data) {
                xhr.send();
            } else if (data instanceof FormData) {
                xhr.send(data);
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    }
}

// headers["Content-Type"] === "multipart/form-data"
// xhr.send(data as unknown as FormData);
// xhr.send(JSON.stringify(data));
