/********************
 * Require Statements
 ********************/
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes");
const mongoose = require("./database/index");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// const passport = require("passport");
// const GithubStrategy = require("passport-github2").Strategy;
// const session = require("express-session");

const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

//TODO: Skipping setting up session and Github OAuth

app.use("/", routes);

//Route for swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//404 Error Handler
app.use(async (req, res, next) => {
    next({ status: 404, message: "That URL might be incorrect. There's nothing here." });
});

//Error Handler
app.use(async (err, req, res, next) => {
    console.error(`Error at "${req.originalURL}": ${err.message}`);
    res.status(err.status || 500).send({
        error: {
            status: err.status || 500,
            message: err.message || "I'm sorry. There was a problem processing your request."
        }
    });
});

mongoose.initConnection(() => {
    app.listen(port, () => {
        console.log(`Server is running, connected to MongoDB and listening on port ${port}`);
    });
});
