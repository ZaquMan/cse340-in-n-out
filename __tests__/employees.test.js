/* eslint-disable no-undef */
const { getAllEmployees, getSingleEmployee } = require("../controllers/employees");
const Employee = require("../models/employees");
const { CastError } = require("mongoose").Error;

jest.mock("../models/employees"); // mock the Mongoose model

describe("Employee Controller GET routes", () => {
    let req, res, next;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        next = jest.fn();
    });

    // ---- Tests for getAllEmployees ----
    it("should return all employees", async () => {
        Employee.find.mockResolvedValue([{ _id: "1", name: "Alice" }]);

        await getAllEmployees(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith([{ _id: "1", name: "Alice" }]);
    });

    it("should handle no employees found", async () => {
        Employee.find.mockResolvedValue(null);

        await getAllEmployees(req, res, next);

        expect(next).toHaveBeenCalledWith({ status: 404, message: "No employees were found." });
    });

    it("should handle errors in getAllEmployees", async () => {
        const error = new Error("DB error");
        Employee.find.mockRejectedValue(error);

        await getAllEmployees(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });

    // ---- Tests for getSingleEmployee ----
    it("should return a single employee by ID", async () => {
        req.params = { id: "123" };
        Employee.findById.mockResolvedValue({ _id: "123", name: "Bob" });

        await getSingleEmployee(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ _id: "123", name: "Bob" });
    });

    it("should handle employee not found", async () => {
        req.params = { id: "999" };
        Employee.findById.mockResolvedValue(null);

        await getSingleEmployee(req, res, next);

        expect(next).toHaveBeenCalledWith({
            status: 404,
            message: "That employee does not exist."
        });
    });

    it("should handle invalid employee id (CastError)", async () => {
        req.params = { id: "invalid-id" };
        const error = new CastError("ObjectId", "invalid-id", "id");
        Employee.findById.mockRejectedValue(error);

        await getSingleEmployee(req, res, next);

        expect(next).toHaveBeenCalledWith({ status: 400, message: "Invalid employee id." });
    });

    it("should handle other errors in getSingleEmployee", async () => {
        req.params = { id: "123" };
        const error = new Error("Unexpected error");
        Employee.findById.mockRejectedValue(error);

        await getSingleEmployee(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });
});
