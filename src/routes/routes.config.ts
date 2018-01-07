import {Route} from "./route.class";

export class RoutesConfig {

    public routes: Array<Route>;


    constructor() {
        this.routes = [
            new Route("/", "IndexController", 'indexAction', ["GET"])
        ];
    }


}

