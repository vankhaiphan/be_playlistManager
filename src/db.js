const mongoose = require("mongoose");
const { dbConfig } = require("./config");
require("dotenv").config();
const username = dbConfig.dbusername;
const password = dbConfig.dbpassword;
const option = dbConfig.dbOption;

let db = mongoose.Connection;

const connect = () => {
    let uri = "";
    uri = `mongodb+srv://${username}:${password}@theboringcompany.3k9jx.mongodb.net/youtubePlaylist?retryWrites=true&w=majority`;
    mongoose
        .connect(uri, option)
        .then(() => {
            console.log("Connect successfully to the database.");
        })
        .catch((error) => {
            console.error("Error connecting to the databse: ", error);
        });

    db = mongoose.connection.useDb("youtubePlaylist");
    return db;
};

const disconnect = () => {
    if (!db) {
        return;
    }
    mongoose.disconnect();
};

module.exports.connect = connect;
module.exports.disconnect = disconnect;