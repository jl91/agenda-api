import {Controller} from "./Controller.interface";
import {Application} from "../application/Application.class";

export abstract class AbstractController implements Controller {
    public application: Application;

    constructor(application: Application) {
        this.application = application;
    }
}