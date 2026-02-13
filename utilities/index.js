const { validationResult } = require("express-validator");
const Employee = require("../models/employees");
require("dotenv").config();

const Util = {};

const roleAuthority = process.env.ROLE_AUTHORITY.split(",");

Util.errorHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

Util.isAuthenticate = (role) => async (req, res, next) => {
    if (roleAuthority.indexOf(role) < 0) {
        next({
            status: 500,
            message: "There is a misconfigured role requirement for this resource."
        });
        return;
    }
    if (req.session.user === undefined) {
        return res.status(401).json("You do not have access. Please login");
    }
    const employee = await Employee.findOne({ oauthId: req.session.user.id });
    if (!employee) {
        next({
            status: 404,
            message: "There is not an employee associated with that login."
        });
        return;
    }
    if (roleAuthority.indexOf(employee.role) > -1) {
        const employeeAccessLevel = roleAuthority.findIndex((element) => element == employee.role);
        const requiredAccessLevel = roleAuthority.findIndex((element) => element == role);
        if (employeeAccessLevel < requiredAccessLevel) {
            return res.status(403).json("You are not permitted to access this resource.");
        }
    } else {
        next({
            status: 500,
            message: "Your role is not a currently recognized role."
        });
        return;
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
