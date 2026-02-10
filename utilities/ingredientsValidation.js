const { body } = require("express-validator");
const validate = {};

/*  **********************************
  Ingredients Validation Rules
********************************** */
validate.ingredientsRules = () => {
    return [
        body("name").trim().notEmpty().isString(),

        body("quantity").notEmpty().isFloat({ min: 0 }).toFloat()
    ];
};

module.exports = validate;
