import EventBus from "./eventBus.ts";

enum WSTransportEvents {
    Connected = "Connected",
    Close = "Close",
    Error = "Error",
    Message = "Message"
}

export default class WSTransport extends EventBus {

    private socket?: WebSocket;
    private pingInterval?: string;
    private readonly pingIntervalTime = 30000;
    private url: string;

    constructor(url: string) {
        super();
        this.url = url;
    }

    public send(data: string | number | object) {
        if (!this.socket) {
            throw new Error("Соединение не открыто.");
        }
        this.socket.send(JSON.stringify(data));

    }

    public connect(): Promise<void> {
        if (this.socket) {
            throw new Error("Соединение уже установлено.");
        }

        this.socket = new WebSocket(this.url);
        this.subscribe(this.socket);
        this.setupPing();

        return new Promise((resolve, reject) => {
            this.on(WSTransportEvents.Error, reject);
            this.on(WSTransportEvents.Connected, () => {
                this.off(WSTransportEvents.Error, reject);
                resolve();
            });
        });
    }

    public close() {
        if (this.socket) {
            this.socket.close();
            clearInterval(this.pingInterval);
        }
    }

    private setupPing() {
        this.pingInterval = setInterval(() => {
            this.send({ type: "ping" })
        }, this.pingIntervalTime);

        this.on(WSTransportEvents.Close, () => {
            clearInterval(this.pingInterval);
            this.pingInterval = undefined;
        })
    }

    private subscribe(socket: WebSocket) {

        socket.addEventListener("open", () => {
            this.emit(WSTransportEvents.Connected);
        });

        socket.addEventListener("close", () => {
            this.emit(WSTransportEvents.Close);
        });

        socket.addEventListener("error", (event) => {
            this.emit(WSTransportEvents.Error);
        });

        socket.addEventListener("message", (message) => {
            try {
                const data = JSON.parse(message.data);
                if (data.type === "pong" || data.type === "user connected") {
                    return;
                }
                this.emit(WSTransportEvents.Message, data);
            } catch (error) {
                console.log(error);
            }
        });
    }
}
