const mongoose = require("mongoose");
require("dotenv").config();

const initConnection = (callback) => {
    console.log(process.env.MONGODB_CONNECTION_STRING);
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    var db = mongoose.connection;
    db.on("error", function (err) {
        console.error("Failed to connect to MongoDB");
        process.exit(1);
    });

    db.once("open", function () {
        console.log("Connected to MongoDB");
        callback();
    });
};

module.exports = { initConnection };
