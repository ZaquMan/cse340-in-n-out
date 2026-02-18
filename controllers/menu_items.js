// const ObjectId = require("mongodb").ObjectId;

//We require the ingredients model in order to verify that the ingredients that we are posting indeed exist.
const Menu_item = require("../models/menu");
const Ingredient = require("../models/ingredients");
const { CastError, DocumentNotFoundError } = require("mongoose").Error;

const getAllMenu_items = async (req, res, next) => {
    try {
        const menu_items = await Menu_item.find().populate("ingredients", "name");
        if (!menu_items) {
            next({ status: 404, message: "No menu items were found." });
            return;
        }
        res.status(200).send(menu_items);
    } catch (error) {
        next(error);
    }
};

const getSingleMenu_item = async (req, res, next) => {
    const id = req.params.id;
    try {
        const menu_item = await Menu_item.findById(id).populate("ingredients", "name");
        if (!menu_item) {
            next({ status: 404, message: "That menu item does not exist." });
            return;
        }
        res.status(200).send(menu_item);
    } catch (error) {
        if (error instanceof CastError) {
            next({ status: 400, message: "Invalid menu item id." });
            return;
        }
        next(error);
    }
};

const createMenu_item = async (req, res, next) => {
    const { name, price, ingredients } = req.body;
    try {
        //Before saing the ingredients, we need to verify if the ingredients actually exists in the ingredients collection
        if (ingredients && ingredients.length > 0) {
            const foundIngredients = await Ingredient.find({
                _id: { $in: ingredients }
            });
            if (foundIngredients.length != ingredients.length) {
                return next({
                    status: 400,
                    message: "One or more ingredients IDs do not exist."
                });
            }
        }
        const menu_item = await Menu_item.create({
            name: name,
            price: price,
            ingredients: ingredients
        });
        if (!menu_item) {
            next({ status: 400, message: "Unable to create a new menu item." });
            return;
        }
        res.status(201).send(menu_item._id);
    } catch (error) {
        next(error);
    }
};

const updateMenu_item = async (req, res, next) => {
    const id = req.params.id;
    try {
        const menu_item = await Menu_item.findById(id);
        if (!menu_item) {
            next({ status: 404, message: "The menu item was not found." });
            return;
        }

        menu_item.name = req.body.name;
        menu_item.price = req.body.price;
        menu_item.ingredients = req.body.ingredients;

        if (menu_item.ingredients && menu_item.ingredients.length > 0) {
            const foundIngredients = await Ingredient.find({
                _id: { $in: menu_item.ingredients }
            });
            if (foundIngredients.length != menu_item.ingredients.length) {
                return next({
                    status: 400,
                    message: "One or more ingredients IDs do not exist."
                });
            }
        }
        await menu_item.save();
        res.status(204).send();
    } catch (error) {
        if (error instanceof DocumentNotFoundError) {
            next({ status: 404, message: "The menu item was not found." });
            return;
        } else if (error instanceof CastError) {
            next({ status: 400, message: "Invalid menu item id." });
            return;
        } else {
            next(error);
        }
    }
};

const deleteMenu_item = async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await Menu_item.deleteOne({ _id: id });
        if (result.deletedCount == 0 && result.acknowledged) {
            next({ status: 404, message: "That menu item doesn't exist" });
            return;
        }
        res.status(204).send();
    } catch (error) {
        if (error instanceof CastError) {
            next({ status: 400, message: "That is an invalid menu item id." });
            return;
        }
        next(error);
    }
};

module.exports = {
    getAllMenu_items,
    getSingleMenu_item,
    createMenu_item,
    updateMenu_item,
    deleteMenu_item
};
