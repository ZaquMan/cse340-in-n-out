const router = require("express").Router();
const utilities = require("../utilities/");
const validate = require("../utilities/menu_itemsValidation");
const menu_itemsController = require("../controllers/menu_items");

/***************
 *Menu_items Collection
 ***************/

router.get(
    "/",
    // #swagger.tags=['Menu_items']
    utilities.errorHandler(menu_itemsController.getAllMenu_items)
);

router.get(
    "/:id",
    // #swagger.tags=['Menu_items']
    utilities.errorHandler(menu_itemsController.getSingleMenu_item)
);

router.post(
    "/",
    /* #swagger.tags=['Menu_items']
           #swagger.parameters["body"] = {
          in: "body",
          schema: {
              $name: "Cheeseburger",
              $price: 10.0,
              ingredients: ["698572fc78981de026571e8d", "6985739378981de026571e96"]
       }
    }*/
    //utilities.isAuthenticate,
    validate.menu_itemsRules(),
    utilities.checkingErrors,
    utilities.errorHandler(menu_itemsController.createMenu_item)
);

router.put(
    "/:id",
    /* #swagger.tags=['Menu_items']
           #swagger.parameters["body"] = {
          in: "body",
          schema: {
              $name: "Cheeseburger",
              $price: 10.0,
              ingredients: ["698572fc78981de026571e8d", "6985739378981de026571e96"]
       }
    }*/
    //utilities.isAuthenticate,
    validate.menu_itemsRules(),
    utilities.checkingErrors,
    utilities.errorHandler(menu_itemsController.updateMenu_item)
);

router.delete(
    "/:id",
    // #swagger.tags=['Menu_items']
    //utilities.isAuthenticate,
    utilities.errorHandler(menu_itemsController.deleteMenu_item)
);

module.exports = router;
