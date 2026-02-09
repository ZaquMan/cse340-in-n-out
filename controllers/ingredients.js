// const ObjectId = require("mongodb").ObjectId;
const Ingredient = require("../models/ingredients");
const { CastError, DocumentNotFoundError } = require("mongoose").Error;

const getAllIngredients = async (req, res, next) => {
    try {
        const ingredients = await Ingredient.find();
        if (!ingredients) {
            throw new Error({ status: 404, message: "No ingredients were found." });
        }
        res.status(200).send(ingredients);
    } catch (error) {
        next(error);
    }
};

const getSingleIngredient = async (req, res, next) => {
    const id = req.params.id;
    try {
        const ingredient = await Ingredient.findById(id);
        if (!ingredient) {
            throw new Error({ status: 404, message: "That ingredient does not exist." });
        }
        res.status(200).send(ingredient);
    } catch (error) {
        if (error instanceof CastError) {
            next({ status: 400, message: "Invalid ingredient id." });
            return;
        }
        next(error);
    }
};

const createIngredient = async (req, res, next) => {
    const { name, quantity } = req.body;
    try {
        const ingredient = await Ingredient.create({
            name: name,
            quantity: quantity
        });
        if (!ingredient) {
            throw new Error({ status: 400, message: "Unable to create a new ingredient." });
        }
        res.status(201).send(ingredient._id);
    } catch (error) {
        next(error);
    }
};

const updateIngredient = async (req, res, next) => {
    const id = req.params.id;
    try {
        const ingredient = await Ingredient.findById(id);
        if (!ingredient) {
            throw new Error({ status: 404, message: "The ingredient was not found." });
        }
        if ("name" in req.body) {
            ingredient.name = req.body.name;
        }
        if ("quantity" in req.body) {
            ingredient.quantity = req.body.quantity;
        }
        await ingredient.save();
        res.status(204).send();
    } catch (error) {
        if (error instanceof DocumentNotFoundError) {
            next({ status: 404, message: "The ingredient was not found." });
            return;
        } else if (error instanceof CastError) {
            next({ status: 400, message: "Invalid ingredient id." });
            return;
        } else {
            next(error);
        }
    }
};

const deleteIngredient = async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await Ingredient.deleteOne({ _id: id });
        if (result.deletedCount == 0 && result.acknowledged) {
            next({ status: 404, message: "That ingredient doesn't exist" });
            return;
        }
        res.status(204).send();
    } catch (error) {
        if (error instanceof CastError) {
            next({ status: 400, message: "That is an invalid ingredient id."});
            return;
        }
        next(error);
    }
};

module.exports = {
    getAllIngredients,
    getSingleIngredient,
    createIngredient,
    updateIngredient,
    deleteIngredient
};
