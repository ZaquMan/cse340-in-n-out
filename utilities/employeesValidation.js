const { body } = require("express-validator");
const validate = {};

/*  **********************************
  Employees Validation Rules
********************************** */
validate.employeesRules = () => {
    return [
        body("firstName").trim().notEmpty().isString().isLength({ min: 2 }),

        body("lastName").trim().notEmpty().isString().isLength({ min: 2 }),

        body("hireDate").notEmpty().isISO8601().toDate(),

        body("hourlyPay").notEmpty().isFloat({ min: 0 }).toFloat(),

        body("role").optional().trim().isString().isIn(["employee", "manager"]),

        body("address").trim().notEmpty().isString()
    ];
};

module.exports = validate;
