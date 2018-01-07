import * as express from 'express';
import {RoutesConfig} from "../routes/routes.config";
import {Route} from "../routes/route.class";
import {Controller} from "../controller/Controller.interface";
import {IndexController} from "../controller/IndexController.class";

export class Application {
    public express;
    private router;
    private controllersmap = new Map<string, Controller>();

    constructor() {
        this.express = express();
        this.mountRoutes();
        this.express.use('/', this.router);
    }

    private mountRoutes(): void {
        this.router = express.Router();
        const routesConfig = new RoutesConfig();

        routesConfig.routes
            .forEach((route: Route) => {

                let controller = this.instantiateController(route);

                route.methods
                    .forEach((method: string) => {
                        this.router[method.toLowerCase()](
                            route.path,
                            (request: Request, response: Response) => {
                                controller[route.action](request, response)
                            }
                        );
                    });
            });
    }

    private instantiateController(route: Route): Controller {
        let controller: Controller;
        const controllerClass: any = route.controller;

        if (!this.controllersmap.has(controllerClass)) {

            switch (controllerClass) {
                case 'IndexController':
                    controller = new IndexController();
            }

            this.controllersmap
                .set(controllerClass, controller);
        } else {
            controller = this.controllersmap
                .get(controllerClass);
        }

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
