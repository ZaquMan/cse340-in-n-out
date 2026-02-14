const router = require("express").Router();
const utilities = require("../utilities/");
const validate = require("../utilities/employeesValidation");
const employeesController = require("../controllers/employees");

/***************
 *Employees Collection
 ***************/

router.get(
    "/",
    // #swagger.tags=['Employees']
    utilities.isAuthenticate("employee"), //TODO STRETCH GOAL: if not manager, only show self
    utilities.errorHandler(employeesController.getAllEmployees)
);

router.get(
    "/:id",
    // #swagger.tags=['Employees']
    utilities.isAuthenticate("employee"), //TODO STRETCH GOAL: if not manager, only show self
    utilities.errorHandler(employeesController.getSingleEmployee)
);

router.post(
    "/",
    /* #swagger.tags=['Employees']
           #swagger.parameters["body"] = {
          in: "body",
          schema: {
		  	  oauthId: "43051103",
              $firstName: "Zach",
              $lastName: "Barnett",
              $hireDate: "2020-03-01T00:00:00.000+00:00",
              $hourlyPay: 17.5,
              role: "manager",
              $address: "123 Spooner St, Springville, IL 12345"
       }
    }*/
    // utilities.isAuthenticate("manager"), // In the real world, this would be authenticated too.
    validate.employeesRules(),
    utilities.checkingErrors,
    utilities.errorHandler(employeesController.createEmployee)
);

router.put(
    "/:id",
    /* #swagger.tags=['Employees']
           #swagger.parameters["body"] = {
          in: "body",
          schema: {
              oauthId: "0",
              $firstName: "Zach",
              $lastName: "Barnett",
              $hireDate: "2020-03-01T00:00:00.000+00:00",
              $hourlyPay: 17.5,
              role: "manager",
              $address: "123 Spooner St, Springville, IL 12345"
       }
    }*/
    utilities.isAuthenticate("manager"),
    validate.employeesRules(),
    utilities.checkingErrors,
    utilities.errorHandler(employeesController.updateEmployee)
);

router.delete(
    "/:id",
    // #swagger.tags=['Employees']
    utilities.isAuthenticate("manager"),
    utilities.errorHandler(employeesController.deleteEmployee)
);

module.exports = router;
