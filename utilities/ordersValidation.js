const { body } = require("express-validator");
const validate = {};

/*  **********************************
  Orders Validation Rules
********************************** */
validate.ordersRules = () => {
    return [
        body("customerName").trim().notEmpty().isString().isLength({ min: 2 }),

        body("subTotal").notEmpty().isFloat({ min: 0 }).toFloat(),

        body("tax").notEmpty().isFloat({ min: 0 }).toFloat(),

        body("total").notEmpty().isFloat({ min: 0 }).toFloat(),

        body("items").trim().notEmpty(),

        body("customizations").trim().notEmpty(),

        body("timestamp").notEmpty().isISO8601().toDate()
    ];
};

module.exports = validate;
