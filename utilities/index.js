const Util = {};

Util.errorHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

Util.isAuthenticate = (req, res, next) => {
    if (req.session.user === undefined) {
        return res.status(401).json("You do not have access.");
    }
    next();
};

module.exports = Util;
