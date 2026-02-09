const router = require("express").Router();

router.get("/", (req, res, next) => {
    res.status(200).json("Hello World");
});

router.use("/employees", require("./employees"));

router.use("/ingredients", require("./ingredients"));

router.use("/menu_items", require("./menu_items"));

router.use("/orders", require("./orders"));

module.exports = router;
