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
//app.use(cors({origin: 'http://127.0.0.1:4200', credentials: true}));
//app.use(cors({origin: 'http://localhost:4200', credentials: true}));

let whitelist = ["http://127.0.0.1:4200", "http://localhost:4200"];

app.use(
    cors({
        origin: function(origin, callback) {
            // allow requests with no origin
            if (!origin) return callback(null, true);
            if (whitelist.indexOf(origin) === -1) {
                var message = "The CORS policy for this origin doesn't allow access from the particular origin.";
                return callback(new Error(message), false);
            }
            return callback(null, true);
        },
        credentials: true,
    })
);

app.use("/", routes);
app.use(express.static('./adverts'));

app.listen(apiPort, () => {
    console.log(`Server is listening on port ${apiPort}`);
});