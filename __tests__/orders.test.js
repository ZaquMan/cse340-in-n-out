/* eslint-disable no-undef */
const { getAllOrders, getSingleOrder } = require("../controllers/orders");
const Order = require("../models/orders");
const { CastError } = require("mongoose").Error;

jest.mock("../models/orders"); // mock the Mongoose model

describe("Order Controller GET routes", () => {
    let req, res, next;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        next = jest.fn();
    });

    // ---- Tests for getAllOrders ----
    it("should return all orders", async () => {
        Order.find.mockResolvedValue([{ _id: "1", item: "Pizza" }]);

        await getAllOrders(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith([{ _id: "1", item: "Pizza" }]);
    });

    it("should handle no orders found", async () => {
        Order.find.mockResolvedValue(null);

        await getAllOrders(req, res, next);

        expect(next).toHaveBeenCalledWith({ status: 404, message: "No orders were found." });
    });

    it("should handle errors in getAllOrders", async () => {
        const error = new Error("DB error");
        Order.find.mockRejectedValue(error);

        await getAllOrders(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });

    // ---- Tests for getSingleOrder ----
    it("should return a single order by ID", async () => {
        req.params = { id: "123" };
        Order.findById.mockResolvedValue({ _id: "123", item: "Burger" });

        await getSingleOrder(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ _id: "123", item: "Burger" });
    });

    it("should handle order not found", async () => {
        req.params = { id: "999" };
        Order.findById.mockResolvedValue(null);

        await getSingleOrder(req, res, next);

        expect(next).toHaveBeenCalledWith({ status: 404, message: "That order does not exist." });
    });

    it("should handle invalid order id (CastError)", async () => {
        req.params = { id: "invalid-id" };
        const error = new CastError("ObjectId", "invalid-id", "id");
        Order.findById.mockRejectedValue(error);

        await getSingleOrder(req, res, next);

        expect(next).toHaveBeenCalledWith({ status: 400, message: "Invalid order id." });
    });

    it("should handle other errors in getSingleOrder", async () => {
        req.params = { id: "123" };
        const error = new Error("Unexpected error");
        Order.findById.mockRejectedValue(error);

        await getSingleOrder(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });
});
