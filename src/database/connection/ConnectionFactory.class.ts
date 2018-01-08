import {Connection, Mongoose} from 'mongoose';
import {Singleton} from "ts.di/src/Injector";

@Singleton()
export class ConnectionFactory {

    private mongoose: Mongoose;
    private connection;

    constructor() {
        this.mongoose = new Mongoose();
        this.connection = this.mongoose.createConnection("mongodb://localhost:27017/agenda");
        this.connection.useDb('agenda');
    }

    public getConnection(): Connection {
        return this.connection;
    }
}