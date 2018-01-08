import {Application} from "../application/Application.class";
import {UsersModel} from "../database/model/UsersModel.class";
import {Controller} from "./Controller.interface";

export class UsersController implements Controller {

    public constructor(private usersModel: UsersModel,
                       private application: Application) {
    }

    public indexAction(request, response) {

        response.send({
            'message': 'users'
        });
    }

}