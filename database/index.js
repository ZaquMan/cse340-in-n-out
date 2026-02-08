const mongoose = require("mongoose");
require("dotenv").config();

const initConnection = (callback) => {
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    var db = mongoose.connection;
    db.on("error", function (err) {
        console.error("Failed to connect to MongoDB");
        process.exit(1);
    });

    db.once("open", function () {
        callback();
    });
};

module.exports = { initConnection };
