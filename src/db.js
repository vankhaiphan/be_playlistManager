const mongoose = require("mongoose");
const { dbConfig } = require("./config");
require("dotenv").config();
const username = dbConfig.dbusername;
const password = dbConfig.dbpassword;
const option = dbConfig.dbOption;
const dbHelper = require("./dbHelper.js");

let Schema = mongoose.Schema;
ObjectID = Schema.ObjectID;

const connect = () => {
    let uri = "";
    uri = `mongodb+srv://${username}:${password}@theboringcompany.3k9jx.mongodb.net/youtubePlaylist?retryWrites=true&w=majority`;
    let connection = mongoose.createConnection(uri, option);

    return connection.useDb("youtubePlaylist");
};

const disconnect = () => {
    if (!db) {
        return;
    }
    mongoose.disconnect();
};

const db = connect();

module.exports = {
    db: db,
    connect: connect,
    disconnect: disconnect,
    Schema: Schema,
    ObjectID: ObjectID,
    dbHelper: dbHelper,
};