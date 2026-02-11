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
    utilities.errorHandler(employeesController.getAllEmployees)
);

router.get(
    "/:id",
    // #swagger.tags=['Employees']
    utilities.errorHandler(employeesController.getSingleEmployee)
);

router.post(
    "/",
    /* #swagger.tags=['Employees']
           #swagger.parameters["body"] = {
          in: "body",
          schema: {
		  	  oauth: "43051103"
              $firstName: "Zach",
              $lastName: "Barnett",
              $hireDate: "2020-03-01T00:00:00.000+00:00",
              $hourlyPay: 17.5,
              $role: "manager",
              $address: "123 Spooner St, Springville, IL 12345"
       }
    }*/
    //utilities.isAuthenticate,
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
              $firstName: "Zach",
              $lastName: "Barnett",
              $hireDate: "2020-03-01T00:00:00.000+00:00",
              $hourlyPay: 17.5,
              $role: "manager",
              $address: "123 Spooner St, Springville, IL 12345",
              $ssn: "40f9asj499scd"
       }
    }*/
    //utilities.isAuthenticate,
    validate.employeesRules(),
    utilities.checkingErrors,
    utilities.errorHandler(employeesController.updateEmployee)
);

router.delete(
    "/:id",
    // #swagger.tags=['Employees']
    utilities.errorHandler(employeesController.deleteEmployee)
);

module.exports = router;
