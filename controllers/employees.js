// const ObjectId = require("mongodb").ObjectId;
const Employee = require("../models/employees");
const { CastError, DocumentNotFoundError } = require("mongoose").Error;

const getAllEmployees = async (req, res, next) => {
    try {
        const Employees = await Employee.find();
        if (!Employees) {
            next({ status: 404, message: "No employees were found." });
            return;
        }
        res.status(200).send(Employees);
    } catch (error) {
        next(error);
    }
};

const getSingleEmployee = async (req, res, next) => {
    const id = req.params.id;
    try {
        const employee = await Employee.findById(id);
        if (!employee) {
            next({ status: 404, message: "That employee does not exist." });
            return;
        }
        res.status(200).send(employee);
    } catch (error) {
        if (error instanceof CastError) {
            next({ status: 400, message: "Invalid employee id." });
            return;
        }
        next(error);
    }
};

const createEmployee = async (req, res, next) => {
    const { oauthId, firstName, lastName, hireDate, hourlyPay, role, address } = req.body;
    try {
        const employee = await Employee.create({
            oauthId: oauthId,
            firstName: firstName,
            lastName: lastName,
            hireDate: hireDate,
            hourlyPay: hourlyPay,
            role: role,
            address: address
        });
        if (!employee) {
            next({ status: 400, message: "Unable to create a new employee." });
            return;
        }
        res.status(201).send(employee._id);
    } catch (error) {
        next(error);
    }
};

const updateEmployee = async (req, res, next) => {
    const id = req.params.id;
    try {
        const employee = await Employee.findById(id);
        if (!employee) {
            next({ status: 404, message: "The employee was not found." });
            return;
        }
        // PUT requests require all the fields, even if they are not being changed
        employee.firstName = req.body.firstName;
        employee.lastName = req.body.lastName;
        employee.hireDate = req.body.hireDate;
        employee.hourlyPay = req.body.hourlyPay;
        employee.address = req.body.address;

        // Our validation allows role and oauthId to be optional to allow for default values
        if ("role" in req.body) {
            employee.role = req.body.role;
        }
        if ("oauthId" in req.body) {
            employee.oauthId = req.body.oauthId;
        }

        await employee.save();
        res.status(204).send();
    } catch (error) {
        if (error instanceof DocumentNotFoundError) {
            next({ status: 404, message: "The employee was not found." });
            return;
        } else if (error instanceof CastError) {
            next({ status: 400, message: "Invalid employee id." });
            return;
        } else {
            next(error);
        }
    }
};

const deleteEmployee = async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await Employee.deleteOne({ _id: id });
        if (result.deletedCount == 0 && result.acknowledged) {
            next({ status: 404, message: "That employee doesn't exist" });
            return;
        }
        res.status(204).send();
    } catch (error) {
        if (error instanceof CastError) {
            next({ status: 400, message: "That is an invalid employee id." });
            return;
        }
        next(error);
    }
};

module.exports = {
    getAllEmployees,
    getSingleEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
};
