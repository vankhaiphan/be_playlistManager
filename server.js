const express = require("express");
const { connect: dbconnect } = require("./src/db");
const { apiPort } = require("./src/config");
const routes = require("./src/routes");
const bodyParser = require("body-parser");
// Connect to the database
dbconnect();

// Create the server
const app = express();

// const cookieParser = require("cookie-parser");
// app.use(cookieParser());
app.use(bodyParser.json({ limit: "5mb" }));
// app.get("/", (req, res) => res.send("Hello World"));

const cors = require("cors");
app.use(cors({ origin: "http://127.0.0.1:4200", credentials: true }));

app.use("/", routes);

app.listen(apiPort, () => {
    console.log(`Server is listening on port ${apiPort}`);
});