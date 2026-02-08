const { Schema, model } = require("mongoose");

const ingredientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Schema.Types.Number,
        required: true,
        min: [0, "You can't less than 0 of an item."]
    }
});

const Ingredient = model("Ingredient", ingredientSchema);

module.exports = Ingredient;
