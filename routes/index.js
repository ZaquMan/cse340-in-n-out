const router = require("express").Router();
const passport = require("passport");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

router.get("/", (req, res, next) => {
    res.status(200).send(
        req.session.user !== undefined
            ? `Logged in as ${req.session.user.displayName}`
            : "Logged out"
    );
});

// OAuth Routes
router.get(
    "/github/callback",
    // #swagger.tags=['OAuth']
    passport.authenticate("github", {
        failureRedirect: "/api-docs",
        session: false
    }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect("/");
    }
);

router.get(
    "/login",
    // #swagger.tags=['OAuth']
    passport.authenticate("github"),
    (req, res) => {}
);

router.get(
    "/logout",
    // #swagger.tags=['OAuth']
    (req, res, next) => {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            res.redirect("/");
        });
    }
);

// Swagger documentation
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.use("/employees", require("./employees"));

router.use("/ingredients", require("./ingredients"));

router.use("/orders", require("./orders"));

router.use("/menu_items", require("./menu_items"));

module.exports = router;
