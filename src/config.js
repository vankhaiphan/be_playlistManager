const dotenv = require("dotenv");
dotenv.config();

const apiPort = process.env.PORT || 3000;

const dbConfig = {
    dbusername: process.env.DB_USER || "",
    dbpassword: process.env.DB_PASS || "",
    dbOption: {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
};

module.exports.apiPort = apiPort;
module.exports.dbConfig = dbConfig;