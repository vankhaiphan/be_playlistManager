const dbConfig = require("./config");
require("dotenv").config();
const username = dbConfig.dbusername;
const password = dbConfig.dbpassword;
const { uuid } = require("uuidv4");
const randomstring = require("../node_modules/randomstring");

module.exports = {
    dburl: `mongodb+srv://${username}:${password}@theboringcompany.3k9jx.mongodb.net/youtubePlaylist?retryWrites=true&w=majority`,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },

    generateIdTechnique: function() {
        // id technique is a uuidv4
        return uuid();
    },
};