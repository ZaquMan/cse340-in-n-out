const router = require("express").Router();
const utilities = require("../utilities");

const ingredientsController = require("../controllers/ingredients");

/***************
 *Ingredients Collection
 ***************/

router.get(
    "/",
    // #swagger.tags=['Ingredients']
    utilities.errorHandler(ingredientsController.getAllIngredients)
);

router.get(
    "/:id",
    // #swagger.tags=['Ingredients']
    utilities.errorHandler(ingredientsController.getSingleIngredient)
);

router.post(
    "/",
    /* #swagger.tags=['Ingredients']
	  	   #swagger.parameters["body"] = {
	      in: "body",
	      schema: {
	          $name: "",
	          $quantity: 0
	   }
	}*/
    utilities.errorHandler(ingredientsController.createIngredient)
);

router.put(
    "/:id",
    /* #swagger.tags=['Ingredients']
	  	   #swagger.parameters["body"] = {
	      in: "body",
	      schema: {
	          name: "",
	          quantity: 0
	   }
	}*/
    utilities.errorHandler(ingredientsController.updateIngredient)
);

router.delete(
    "/:id",
    // #swagger.tags=['Ingredients']
    utilities.errorHandler(ingredientsController.deleteIngredient)
);

module.exports = router;
