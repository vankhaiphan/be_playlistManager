const dbConfig = require("./config");
require("dotenv").config();
const username = dbConfig.dbusername;
const password = dbConfig.dbpassword;
const uuidv4 = require("../node_modules/uuidv4");
const randomstring = require("../node_modules/randomstring");
const bcrypt = require("bcrypt");
const saltRounds = 10; // The higher the number, the longer it takes

module.exports = {
    dburl: `mongodb+srv://${username}:${password}@theboringcompany.3k9jx.mongodb.net/youtubePlaylist?retryWrites=true&w=majority`,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },

    generateIdTechnique: function() {
        // id technique is a uuidv4
        return uuidv4();
    },

    hashCode: function() {
        bcrypt.hash(password, saltRounds, function(err, hash) {
            // Store hash in your password DB.
        });
    },
};