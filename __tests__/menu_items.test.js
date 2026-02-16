/* eslint-disable no-undef */
const { getAllMenu_items, getSingleMenu_item } = require("../controllers/menu_items");
const Menu_item = require("../models/menu");
const { CastError } = require("mongoose").Error;

jest.mock("../models/menu"); // mock the Mongoose model

describe("Menu Controller GET routes", () => {
    let req, res, next;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        next = jest.fn();
    });

    // ---- Tests for getAllMenu_items ----
    it("should return all menu items", async () => {
        Menu_item.find.mockResolvedValue([{ _id: "1", name: "Pizza" }]);

        await getAllMenu_items(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith([{ _id: "1", name: "Pizza" }]);
    });

    it("should handle no menu items found", async () => {
        Menu_item.find.mockResolvedValue(null);

        await getAllMenu_items(req, res, next);

        expect(next).toHaveBeenCalledWith({ status: 404, message: "No menu items were found." });
    });

    it("should handle errors in getAllMenu_items", async () => {
        const error = new Error("DB error");
        Menu_item.find.mockRejectedValue(error);

        await getAllMenu_items(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });

    // ---- Tests for getSingleMenu_item ----
    it("should return a single menu item by ID", async () => {
        req.params = { id: "123" };
        Menu_item.findById.mockResolvedValue({ _id: "123", name: "Burger" });

        await getSingleMenu_item(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ _id: "123", name: "Burger" });
    });

    it("should handle menu item not found", async () => {
        req.params = { id: "999" };
        Menu_item.findById.mockResolvedValue(null);

        await getSingleMenu_item(req, res, next);

        expect(next).toHaveBeenCalledWith({
            status: 404,
            message: "That menu item does not exist."
        });
    });

    it("should handle invalid menu item id (CastError)", async () => {
        req.params = { id: "invalid-id" };
        const error = new CastError("ObjectId", "invalid-id", "id");
        Menu_item.findById.mockRejectedValue(error);

        await getSingleMenu_item(req, res, next);

        expect(next).toHaveBeenCalledWith({ status: 400, message: "Invalid menu item id." });
    });

    it("should handle other errors in getSingleMenu_item", async () => {
        req.params = { id: "123" };
        const error = new Error("Unexpected error");
        Menu_item.findById.mockRejectedValue(error);

        await getSingleMenu_item(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });
});
