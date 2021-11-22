const express = require("express");
const { connect: dbconnect } = require("./db");
const { apiPort } = require("./config");
const routes = require("../src/routes");
const bodyParser = require("body-parser");
// Connect to the database
dbconnect();

// Create the server
const app = express();

// const cookieParser = require("cookie-parser");
// app.use(cookieParser());
app.use(bodyParser.json({ limit: "5mb" }));
// app.get("/", (req, res) => res.send("Hello World"));

app.use("/", routes);

// const testdb = require('./Recup_all_users');
// app.post('/Recup_all_users',(req, res) => { testdb(req,res) ;})

app.listen(apiPort, () => {
    console.log(`Server is listening on port ${apiPort}`);
});