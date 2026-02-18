// const ObjectId = require("mongodb").ObjectId;
const Order = require("../models/orders");
const Menu_item = require("../models/menu");
const Ingredient = require("../models/ingredients");
const { CastError, DocumentNotFoundError } = require("mongoose").Error;

const getAllOrders = async (req, res, next) => {
    try {
        const findQuery = Order.find();
        const orders =
            findQuery && typeof findQuery.populate === "function"
                ? await findQuery.populate("items", "name")
                : await findQuery;
        if (!orders) {
            next({ status: 404, message: "No orders were found." });
            return;
        }
        res.status(200).send(orders);
    } catch (error) {
        next(error);
    }
};

const getSingleOrder = async (req, res, next) => {
    const id = req.params.id;
    try {
        const findQuery = Order.findById(id);
        const order =
            findQuery && typeof findQuery.populate === "function"
                ? await findQuery.populate("items", "name")
                : await findQuery;
        if (!order) {
            next({ status: 404, message: "That order does not exist." });
            return;
        }
        res.status(200).send(order);
    } catch (error) {
        if (error instanceof CastError) {
            next({ status: 400, message: "Invalid order id." });
            return;
        }
        next(error);
    }
};

const createOrder = async (req, res, next) => {
    const { customerName, subTotal, tax, total, items, customizations, timestamp } = req.body;
    const ingredientsUsed = [];
    try {
        // Check if there is enough inventory for each menu_item and decrease it's quantity
        for (const itemId of items) {
            const menu_item = await Menu_item.findById(itemId);
            for (const ingredientId of menu_item.ingredients) {
                const result = await Ingredient.findOneAndUpdate(
                    { _id: ingredientId, quantity: { $gte: 0 } }, //Only updates if there is some inventory
                    { $inc: { quantity: -1 } },
                    { returnDocument: "after" }
                );
                if (!result) {
                    // Restore inventory levels if we can't complete an order.
                    if (ingredientsUsed) {
                        for (const Id of ingredientsUsed) {
                            await Ingredient.findOneAndUpdate(
                                { _id: Id },
                                { $inc: { quantity: 1 } }
                            );
                        }
                    }
                    next({
                        status: 400,
                        message: `There are not enough of ingredient ${ingredientId} for this order.`
                    });
                    return;
                } else {
                    ingredientsUsed.push(ingredientId);
                }
            }
        }

        const order = await Order.create({
            customerName: customerName,
            subTotal: subTotal,
            tax: tax,
            total: total,
            items: items,
            customizations: customizations,
            timestamp: timestamp
        });
        if (!order) {
            next({ status: 400, message: "Unable to create a new order." });
            return;
        }
        res.status(201).send(order._id);
    } catch (error) {
        next(error);
    }
};

const updateOrder = async (req, res, next) => {
    const id = req.params.id;
    try {
        const order = await Order.findById(id);
        if (!order) {
            next({ status: 404, message: "The order was not found." });
            return;
        }

        order.customerName = req.body.customerName;
        order.subTotal = req.body.subTotal;
        order.tax = req.body.tax;
        order.total = req.body.total;
        order.items = req.body.items;
        order.customizations = req.body.customizations;
        order.timestamp = req.body.timestamp;

        await order.save();
        res.status(204).send();
    } catch (error) {
        if (error instanceof DocumentNotFoundError) {
            next({ status: 404, message: "The order was not found." });
            return;
        } else if (error instanceof CastError) {
            next({ status: 400, message: "Invalid order id." });
            return;
        } else {
            next(error);
        }
    }
};

const deleteOrder = async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await Order.deleteOne({ _id: id });
        if (result.deletedCount == 0 && result.acknowledged) {
            next({ status: 404, message: "That order doesn't exist" });
            return;
        }
        res.status(204).send();
    } catch (error) {
        if (error instanceof CastError) {
            next({ status: 400, message: "That is an invalid order id." });
            return;
        }
        next(error);
    }
};

module.exports = {
    getAllOrders,
    getSingleOrder,
    createOrder,
    updateOrder,
    deleteOrder
};
