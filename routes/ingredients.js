const router = require("express").Router();

const ingredientsController = require("../controllers/ingredients");

/***************
 *Ingredients Collection
 ***************/

router.get("/", ingredientsController.getAllIngredients);

router.get("/:id", ingredientsController.getSingleIngredient);

router.post("/", ingredientsController.createIngredient);

router.put("/:id", ingredientsController.updateIngredient);

router.delete("/:id", ingredientsController.deleteIngredient);

module.exports = router;
