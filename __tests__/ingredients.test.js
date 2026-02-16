/* eslint-disable no-undef */
const { getAllIngredients, getSingleIngredient } = require("../controllers/ingredients");
const Ingredient = require("../models/ingredients");
const { CastError } = require("mongoose").Error;

jest.mock("../models/ingredients"); // mock the Mongoose model

describe("Ingredient Controller GET routes", () => {
    let req, res, next;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        next = jest.fn();
    });

    // ---- Tests for getAllIngredients ----
    it("should return all ingredients", async () => {
        Ingredient.find.mockResolvedValue([{ _id: "1", name: "Salt" }]);

        await getAllIngredients(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith([{ _id: "1", name: "Salt" }]);
    });

    it("should handle no ingredients found", async () => {
        Ingredient.find.mockResolvedValue(null);

        await getAllIngredients(req, res, next);

        expect(next).toHaveBeenCalledWith({ status: 404, message: "No ingredients were found." });
    });

    it("should handle errors in getAllIngredients", async () => {
        const error = new Error("DB error");
        Ingredient.find.mockRejectedValue(error);

        await getAllIngredients(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });

    // ---- Tests for getSingleIngredient ----
    it("should return a single ingredient by ID", async () => {
        req.params = { id: "123" };
        Ingredient.findById.mockResolvedValue({ _id: "123", name: "Pepper" });

        await getSingleIngredient(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ _id: "123", name: "Pepper" });
    });

    it("should handle ingredient not found", async () => {
        req.params = { id: "999" };
        Ingredient.findById.mockResolvedValue(null);

        await getSingleIngredient(req, res, next);

        expect(next).toHaveBeenCalledWith({
            status: 404,
            message: "That ingredient does not exist."
        });
    });

    it("should handle invalid ingredient id (CastError)", async () => {
        req.params = { id: "invalid-id" };
        const error = new CastError("ObjectId", "invalid-id", "id");
        Ingredient.findById.mockRejectedValue(error);

        await getSingleIngredient(req, res, next);

        expect(next).toHaveBeenCalledWith({ status: 400, message: "Invalid ingredient id." });
    });

    it("should handle other errors in getSingleIngredient", async () => {
        req.params = { id: "123" };
        const error = new Error("Unexpected error");
        Ingredient.findById.mockRejectedValue(error);

        await getSingleIngredient(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });
});
