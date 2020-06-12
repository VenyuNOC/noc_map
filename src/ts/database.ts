import * as Mongoose from "mongoose";

let database: Mongoose.Connection;

export const connect = (uri: string) => {
    if (database) return;

    Mongoose.connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

    database = Mongoose.connection;

    database.once("open", async () => {
        console.log('connected to object store');
    });

    database.on("error", () => {
        console.log('error connecting to database');
    });
}

export const disconnect = () => {
    if (!database) return;

    Mongoose.disconnect();
}