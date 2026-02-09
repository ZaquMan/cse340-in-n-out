// const ObjectId = require("mongodb").ObjectId;
const Ingredient = require("../models/ingredients");
const { CastError } = require("mongoose");

const getAllIngredients = async (req, res, next) => {
    //#swagger.tags=['Ingredients']
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
    //#swagger.tags=['Ingredients']
    /*const ingredientId = new ObjectId(req.params.id);
    const result = await mongoose
        .initConnection()
        .db()
        .collection("ingredients")
        .find({ _id: ingredientId });
    result.toArray().then((ingredients) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(ingredients[0]);
    });*/
    const id = req.params.id;
    try {
        const ingredient = await Ingredient.findById(id);
        if (!ingredient) {
            throw new Error({ status: 404, message: "That ingredient does not exist." })
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

const createIngredient = async (req, res) => {
    //#swagger.tags=['Ingredients']
    /*const ingredient = {
        ingredientName: req.body.ingredientName,
        ingredientQuantity: req.body.ingredientQuantity
    };
    const response = await mongoose
        .initConnection()
        .db()
        .collection("ingredients")
        .insertOne(ingredient);
    if (response.acknowledged > 0) {
        res.status(201).send();
    }*/
};

const updateIngredient = async (req, res) => {
    //#swagger.tags=['Ingredients']
    /*const ingredientId = new ObjectId(req.params.id);
    const ingredient = {
        ingredientName: req.body.ingredientName,
        ingredientQuantity: req.body.ingredientQuantity
    };
    const response = await mongoose
        .initConnection()
        .db()
        .collection("ingredients")
        .replaceOne({ _id: ingredientId }, ingredient);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    }*/
};

const deleteIngredient = async (req, res) => {
    //#swagger.tags=['Ingredients']
    /*const ingredientId = new ObjectId(req.params.id);
    const response = await mongoose
        .initConnection()
        .db()
        .collection("ingredients")
        .deleteOne({ _id: ingredientId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    }*/
};

module.exports = {
    getAllIngredients,
    getSingleIngredient,
    createIngredient,
    updateIngredient,
    deleteIngredient
};
