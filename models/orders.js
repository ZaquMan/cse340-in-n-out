const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
    customerName: {
        type: String,
        default: "Guest"
    },
    subTotal: {
        type: Schema.Types.Double,
        default: 0.0,
        min: [0.0, "Refunds are not supported at this time."]
    },
    tax: {
        type: Schema.Types.Double,
        default: 0.0,
        min: [0.0, "Refunds are not supported at this time."],
        validate: {
            validator: function (value) {
                return value < this.subTotal;
            },
            message:
                "There is not a situation where tax should be equal to or more than the subtotal."
        }
    },
    total: {
        type: Schema.Types.Double,
        default: 0.0,
        min: [0.0, "Refunds are not supported at this time."],
        validate: {
            validator: function (value) {
                const calculatedTotal = this.subTotal + this.tax;
                return value == calculatedTotal;
            },
            message: "Your total does not equal the sum of the subtotal and tax."
        }
    },
    items: [
        {
            type: Schema.Types.ObjectId,
            ref: "menu_items"
        }
    ],
    customizations: Schema.Types.Object, //Did you mean ObjectId?
    timestamp: {
        type: Date,
        max: Date.now()
    }
});

const Order = model("Order", orderSchema);

module.exports = Order;
