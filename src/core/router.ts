export default class Router {

    private routes: any[];
    private history: unknown;
    private currentRoute: null;

    constructor(rootQuery: string) {
        if (Router.__intance) {
            return Router.__intance;
        }
        this.routes = [];
        this.history = window.history;
        this.currentRoute = null;
        this.rootQuery = rootQuery;

        Router.__intance = this;
    }

    public use(pathname: string, block: unknown) {
        const route = new Route(pathname, block, {rootQuery: this.rootQuery});
        this.routes.push(route);
        return this;
    }

    public start() {
        window.onpopstate = (event: Event) => {
            this.onRoute(event.currentTarget.location.pathname);
        }

        this.onRoute(window.location.pathname);
    }

    private onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        // console.log(this.currentRoute);

        if (this.currentRoute) {
            // this.currentRoute.leave();
            this.currentRoute = null;
        }

        this.currentRoute = route;
        // route.render(route, pathname);
        route.render();
    }

    private getRoute(pathname: string) {
        console.log(pathname);
        return this.routes.find(route => route.match(pathname));
    }

    public go(pathname: string): void {
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

    private block: unknown

    constructor(private pathname: unknown, private blockClass: unknown, private props: unknown) {
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

    // public leave(): void {
    //     if (this.block) {
    //         this.block.hide();
    //     }
    // }
    
    private match(pathname: string): boolean {
        return this.isEqual(pathname, this.pathname);
    }

    private render() {
        // console.log(this.block)
        if (!this.block) {
            this.block = new this.blockClass();
        }

        const root = document.querySelector<HTMLElement>("#app");
        root.innerHTML = "";
        root.append(this.block.getContent());
        return;
    }

    private isEqual(path1: string, path2: string) {
        return path1 === path2;
    }
} 
