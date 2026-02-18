const { Schema, model } = require("mongoose");

const menuSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Schema.Types.Double,
        required: true,
        min: [0.0, "You can't have a negative price."]
    },
    ingredients: [
        {
            type: Schema.Types.ObjectId,
            ref: "Ingredient"
        }
    ]
});

const Menu = model("Menu", menuSchema, "menu_items");

module.exports = Menu;
