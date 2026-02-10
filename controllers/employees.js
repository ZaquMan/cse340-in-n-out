// const ObjectId = require("mongodb").ObjectId;
const Employee = require("../models/employees");
const { CastError, DocumentNotFoundError } = require("mongoose").Error;

const getAllEmployees = async (req, res, next) => {
    try {
        const Employees = await Employee.find();
        if (!Employees) {
            throw new Error({ status: 404, message: "No employees were found." });
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
            throw new Error({ status: 404, message: "That employee does not exist." });
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
    const { firstName, lastName, hireDate, hourlyPay, role, address, ssn } = req.body;
    try {
        const employee = await Employee.create({
            firstName: firstName,
            lastName: lastName,
            hireDate: hireDate,
            hourlyPay: hourlyPay,
            role: role,
            address: address,
            ssn: ssn
        });
        if (!employee) {
            throw new Error({ status: 400, message: "Unable to create a new employee." });
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
            throw new Error({ status: 404, message: "The employee was not found." });
        }
        if ("firstName" in req.body) {
            employee.firstName = req.body.firstName;
        }
        if ("lastName" in req.body) {
            employee.lastName = req.body.lastName;
        }
        if ("hireDate" in req.body) {
            employee.hireDate = req.body.hireDate;
        }
        if ("hourlyPay" in req.body) {
            employee.hourlyPay = req.body.hourlyPay;
        }
        if ("role" in req.body) {
            employee.role = req.body.role;
        }
        if ("address" in req.body) {
            employee.address = req.body.address;
        }
        if ("ssn" in req.body) {
            employee.ssn = req.body.ssn;
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
