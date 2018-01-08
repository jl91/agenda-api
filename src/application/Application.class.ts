import * as express from 'express';
import {RoutesConfig} from "../routes/routes.config";
import {Route} from "../routes/route.class";
import {Controller} from "../controller/Controller.interface";
import {IndexController} from "../controller/IndexController.class";

export class Application {
    public express;
    private router;
    private controllersMap = new Map<string, Controller>();

    constructor() {
        this.express = express();
        this.mountRoutes();
    }

    public registerMiddlewareBefore(): void {
        this.express.use('/', this.router);
    }

    private mountRoutes(): void {
        this.router = express.Router();
        const routesConfig = new RoutesConfig();

        this.registerMiddlewareBefore();

        routesConfig.routes
            .forEach((route: Route) => {
                let controller = this.instantiateController(route);
                for (let method of route.methods) {
                    this.registerRoute(method, route, controller);
                }
            });

        this.registerMiddlewareAfter();
    }

    private registerRoute(method: string, route: Route, controller: Controller): void {
        this.router[method.toLowerCase()](
            route.path,
            (request, response) => {
                return controller[route.action](request, response);
            }
        );
    }


    private registerMiddlewareAfter(): void {
        this.express.use((request, response) => {
            response.json(response.body);
        });
    }

    private instantiateController(route: Route): Controller {
        let controller: Controller;
        const controllerClass: any = route.controller;
        const instance = this;

        if (!this.controllersMap.has(controllerClass)) {

            switch (controllerClass) {
                case 'IndexController':
                    controller = new IndexController(instance);
            }

            this.controllersMap
                .set(controllerClass, controller);
        } else {
            controller = this.controllersMap
                .get(controllerClass);
        }

        controller.application = this;

        return controller;
    }

    public init(port: number) {
        this.express
            .listen(port, (error) => {

                if (error) {
                    return console.log(error);
                }

                return console.log(`server is listening on ${port}`)

            });
    }
}
