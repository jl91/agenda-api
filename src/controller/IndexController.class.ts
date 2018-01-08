import {AbstractController} from "./AbstractController.class";
import {Application} from "../application/Application.class";

export class IndexController extends AbstractController {

    public application: Application;

    public indexAction(request, response) {
        response.send({
            'message': 'Hello World! 1'
        });
    }

}