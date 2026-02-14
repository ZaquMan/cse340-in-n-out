const { Schema, model } = require("mongoose");

const employeeSchema = new Schema({
    oauthId: {
        type: String,
        default: ""
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    hireDate: {
        type: Date,
        required: true
    },
    hourlyPay: {
        type: Schema.Types.Double,
        required: true
    },
    role: {
        type: String,
        default: "employee"
    },
    address: {
        type: String,
        required: true
    }
});

const Employee = model("Employee", employeeSchema);

module.exports = Employee;
