const { Schema, model } = require("mongoose");

const ingredientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Schema.Types.Number,
        required: true
    }
});

const Ingredient = model("Ingredient", ingredientSchema);

module.exports = Ingredient;
