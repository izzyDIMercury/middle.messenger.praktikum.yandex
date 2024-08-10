import Block from "./block";

export default class Router {

    private routes!: Array<Route>;
    private history!: History;
    private currentRoute!: null | Route;
    public rootQuery: string;

    constructor(rootQuery: string) {
        this.routes = [];
        this.history = window.history;
        this.currentRoute = null;
        this.rootQuery = rootQuery;
    }

    public use(pathname: string, block: typeof Block) {
        const route = new Route(pathname, block, {rootQuery: this.rootQuery});
        this.routes.push(route);
        return this;
    }

    public start() {
        window.onpopstate = (event: Event) => {
            const target = event.currentTarget as Window;
            if (target !== null) {
                this.onRoute(target.location.pathname);
            }
        }

        this.onRoute(window.location.pathname);
    }

    private onRoute(pathname: string) {
        const route = this.getRoute(pathname) as Route;

        if (this.currentRoute) {
            this.currentRoute = null;
        }

        this.currentRoute = route;
        route.render();
    }

    private getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }

    public go(pathname: string): void {
        console.log(this.routes)
        this.history.pushState({}, "", pathname);
        this.onRoute(pathname);
    }

    public back(): void {
        this.history.back();
    }

    public forward(): void {
        this.history.forward();
    }
} 


class Route {

    private block: any | null;

    // @ts-expect-error ts seems to work here incorrectly
    constructor(private pathname: string, private blockClass: typeof Block, private props: {rootQuery: string}) {
        this.pathname = pathname;
        this.blockClass = blockClass;
        this.block = null;
        this.props = props;
    }

    public navigate(pathname: string): void {
        if (this.match(pathname)) {
            this.pathname = pathname;
            this.render();
        }
    }
    
    public match(pathname: string): boolean {
        return this.isEqual(pathname, this.pathname);
    }

    public render() {
        if (!this.block) {
            this.block = new this.blockClass("");
        }

        const root = document.querySelector<HTMLElement>("#app") as HTMLElement;
        root.innerHTML = "";
        root.append(this.block.getContent());
        return;
    }

    private isEqual(path1: string, path2: string) {
        return path1 === path2;
    }
} 

// (private pathname: string, private blockClass: typeof Block, private props: {rootQuery: string})
