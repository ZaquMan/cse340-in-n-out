// const ObjectId = require("mongodb").ObjectId;
const Order = require("../models/orders");
const { CastError, DocumentNotFoundError } = require("mongoose").Error;

const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find();
        if (!orders) {
            throw new Error({ status: 404, message: "No orders were found." });
        }
        res.status(200).send(orders);
    } catch (error) {
        next(error);
    }
};

const getSingleOrder = async (req, res, next) => {
    const id = req.params.id;
    try {
        const order = await Order.findById(id);
        if (!order) {
            throw new Error({ status: 404, message: "That order does not exist." });
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
    try {
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
            throw new Error({ status: 400, message: "Unable to create a new order." });
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
            throw new Error({ status: 404, message: "The order was not found." });
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
