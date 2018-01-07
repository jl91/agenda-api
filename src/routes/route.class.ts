export class Route {
    public path: string;
    public controller: string;
    public action: string;
    public methods: Array<string>;

    constructor(path: string, controller: string, action: string, methods: Array<string>) {
        this.path = path;
        this.controller = controller;
        this.action = action;
        this.methods = methods;
    }
}