const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "An In-n-Out focused API",
        description:
            "API that allows In-n-Out employees and managers programtic access to managing their store's menu, ingredient inventory, orders, and employees"
    },
    host: "localhost:3000", //Change this to final render url
    schemes: ["http", "https"]
};

const outputFile = "./swagger.json";
const routes = ["./routes/index.js"];

swaggerAutogen(outputFile, routes, doc);
