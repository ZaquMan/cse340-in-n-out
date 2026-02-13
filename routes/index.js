const router = require("express").Router();
const passport = require("passport");

router.get("/", (req, res, next) => {
    res.status(200).send(
        req.session.user !== undefined
            ? `Logged in as ${req.session.user.displayName}`
            : "Logged out"
    );
});

router.get(
    "/github/callback",
    passport.authenticate("github", {
        failureRedirect: "/api-docs",
        session: false
    }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect("/");
    }
);

router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

router.use("/employees", require("./employees"));

router.use("/ingredients", require("./ingredients"));

router.use("/orders", require("./orders"));

router.use("/menu_items", require("./menu_items"));

module.exports = router;
