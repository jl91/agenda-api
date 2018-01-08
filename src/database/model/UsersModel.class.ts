import {UsersSchema} from "../schemas/UsersSchema.class";
import {ConnectionFactory} from "../connection/ConnectionFactory.class";
import {Injectable} from "ts.di/src/Injector";
import {Connection, Model} from "mongoose";

@Injectable()
export class UsersModel {
    private static readonly modelName = 'users';
    private connection: Connection;

    constructor(private connectionFactory: ConnectionFactory) {
        this.connection = this.connectionFactory.getConnection();
    }

    public getModel(): Model<Document> {
        return this.connection.model(UsersModel.modelName, new UsersSchema());
    }
}