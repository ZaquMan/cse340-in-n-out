const mongoose = require("../database/index");
const ObjectId = require("mongodb").ObjectId;

const getAllIngredients = async (req, res) => {
    //#swagger.tags=['Ingredients']
    /*const result = await mongoose.initConnection().db().collection("ingredients").find();
    result.toArray().then((ingredients) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(ingredients);
    });*/
};

const getSingleIngredient = async (req, res) => {
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
