import {Schema} from 'mongoose';

export class UsersSchema extends Schema {
    public static readonly schema = {
        name: String,
        email: String,
        createAt: Date
    };

    constructor() {
        super(UsersSchema.schema);
        this.pre('save', (next) => {
            next();
        });
    }
}