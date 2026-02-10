const { Schema, model } = require("mongoose");
require("dotenv").config();

const employeeSchema = new Schema({
    oauth: String,
    firstName: {
        type: String,
        required: true,
        minLength: 2
    },
    lastName: {
        type: String,
        required: true,
        minLength: 2
    },
    hireDate: {
        type: Date,
        max: [Date.now(), "You can't hire someone in the future."]
    },
    hourlyPay: {
        type: Schema.Types.Double,
        required: true,
        min: [process.env.MINIMUM_WAGE, "You need to pay at least minimum wage."]
    },
    role: {
        type: String,
        default: "employee",
        enum: {
            values: ["employee", "manager"],
            message: "{VALUE} is not a valid role."
        }
    },
    address: {
        type: String,
        required: true
    },
    ssn: {
        type: String,
        required: true
    }
});

const Employee = model("Employee", employeeSchema);

module.exports = Employee;
