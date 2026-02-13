const router = require("express").Router();
const utilities = require("../utilities/");
const validate = require("../utilities/ordersValidation");
const ordersController = require("../controllers/orders");

/***************
 *Orders Collection
 ***************/

router.get(
    "/",
    // #swagger.tags=['Orders']
    utilities.errorHandler(ordersController.getAllOrders)
);

router.get(
    "/:id",
    // #swagger.tags=['Orders']
    utilities.errorHandler(ordersController.getSingleOrder)
);

router.post(
    "/",
    /* #swagger.tags=['Orders']
	  	   #swagger.parameters["body"] = {
	      in: "body",
	      schema: {
	          $customerName: "guest",
              $subTotal: 0,
              $tax : 0.0,
              $total: 0.0,
              $items: [],
              $customizations: {}},
              $timestamp: "2020-03-01T00:00:00.000+00:00"
	   }
	}*/
    //utilities.isAuthenticate,
    validate.ordersRules(),
    utilities.checkingErrors,
    utilities.errorHandler(ordersController.createOrder)
);

router.put(
    "/:id",
    /* #swagger.tags=['Orders']
	  	   #swagger.parameters["body"] = {
	      in: "body",
	      schema: {
	          $customerName: "guest",
              $subTotal: 0,
              $tax : 0.0,
              $total: 0.0,
              $items: [],
              $customizations: {},
              $timestamp: "2020-03-01T00:00:00.000+00:00"
	   }
	}*/
    //utilities.isAuthenticate,
    validate.ordersRules(),
    utilities.checkingErrors,
    utilities.errorHandler(ordersController.updateOrder)
);

router.delete(
    "/:id",
    // #swagger.tags=['Orders']
    // utilities.isAuthenticate,
    utilities.errorHandler(ordersController.deleteOrder)
);

module.exports = router;
