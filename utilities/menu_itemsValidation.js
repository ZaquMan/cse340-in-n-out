const { body } = require("express-validator");
const validate = {};

/*  **********************************
  Menu Items Validation Rules
********************************** */
validate.menu_itemsRules = () => {
    return [
        body("name").trim().notEmpty().isString().isLength({ min: 2 }),

        body("price").notEmpty().isFloat({ min: 0 }).toFloat(),

        body("ingredients").isArray().withMessage("Ingredients must be an array"),

        body("ingredients.*")
            .isMongoId()
            .withMessage("Each ingredient must be a valid mongo object Id")
    ];
};

module.exports = validate;
