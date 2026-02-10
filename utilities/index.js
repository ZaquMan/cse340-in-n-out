const { validationResult } = require("express-validator");
const Util = {};

Util.errorHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

Util.isAuthenticate = (req, res, next) => {
    if (req.session.user === undefined) {
        return res.status(401).json("You do not have access.");
    }
    next();
};

/* ******************************
 * Check data and return errors or continue
 * ***************************** */
Util.checkingErrors = async (req, res, next) => {
    let errors = [];
    errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    next();
};

module.exports = Util;
