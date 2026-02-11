require("dotenv").config();
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

        body("hourlyPay")
            .notEmpty()
            .isFloat({ min: process.env.MINIMUM_WAGE })
            .toFloat()
            .withMessage(`You need to pay are least minimum wage ($${process.env.MINIMUM_WAGE})`),

        body("role")
            .optional()
            .trim()
            .toLowerCase()
            .isString()
            .isIn(["employee", "manager"])
            .withMessage("That is not a valid role."),

        body("address").trim().notEmpty().isString(),

        body("oauthId").optional().notEmpty().trim().isInt({ min: 0 })
    ];
};

module.exports = validate;
