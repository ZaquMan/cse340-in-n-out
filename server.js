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
const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy;
const session = require("express-session");

require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false //TEST: May need to make this true
    })
)
    .use(passport.initialize())
    .use(passport.session());

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
    //DEBUG
    //console.error(`Error at "${req.originalUrl}": ${err.message}`);
    res.status(err.status || 500).send({
        error: {
            status: err.status || 500,
            message: err.message || "I'm sorry. There was a problem processing your request."
        }
    });
});

//Passport Setup - Get user's role
passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL
        },
        function (accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

mongoose.initConnection(() => {
    app.listen(port, () => {
        console.log(`Server is running, connected to MongoDB and listening on port ${port}`);
    });
});
