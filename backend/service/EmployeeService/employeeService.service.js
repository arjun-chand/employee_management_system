const Employee = require('../../db/models/Employee.model');
const { Op, Sequelize } = require('sequelize');

async function isUniqueEmployee(email, phone) {
    const existingEmployee = await Employee.findOne({
        where: {
            [Op.or]: [
                { email: email },
                { phone: phone }
            ]
        }
    });
    return existingEmployee === null;
}

async function addEmployee(employee) {
    try {
        const isUnique = await isUniqueEmployee(employee.email, employee.phone);

        if (!isUnique) {
            throw new Error('Email or phone number already exists.');
        }

        // Create a new employee record in the database
        const newEmployee = await Employee.create(employee);
        return ("employee has been added successfully");
    } catch (error) {
        throw new Error('Error adding employee: ' + error.message);
    }
}

// Update Employee
async function updateEmployee(id, employee) {
    try {
        // Find the employee by ID and update its fields
        const [updatedCount] = await Employee.update(employee, { where: { id } });
        return updatedCount > 0;
    } catch (error) {
        throw new Error('Error updating employee: ' + error.message);
    }
}

// Delete Employee
async function deleteEmployee(id) {
    try {
        // Delete the employee with the specified ID
        const deletedCount = await Employee.destroy({ where: { id } });
        return deletedCount > 0;
    } catch (error) {
        throw new Error('Error deleting employee: ' + error.message);
    }
}

// Get all Employees
async function getAllEmployees() {
    try {
        // Retrieve all employees from the database
        return await Employee.findAll();
    } catch (error) {
        throw new Error('Error getting all employees: ' + error.message);
    }
}

// Search Employees
async function searchEmployees(key) {
    try {
        // Search for employees based on the provided key
        return await Employee.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { name: { [Sequelize.Op.like]: `%${key}%` } },
                    { country: { [Sequelize.Op.like]: `%${key}%` } },
                    { state: { [Sequelize.Op.like]: `%${key}%` } },
                    { city: { [Sequelize.Op.like]: `%${key}%` } },
                    { hobbies: { [Sequelize.Op.like]: `%${key}%` } }
                ]
            }
        });
    } catch (error) {
        throw new Error('Error searching employees: ' + error.message);
    }
}

// Get Employee by ID
async function getEmployeeById(id) {
    try {
        // Find the employee by ID
        return await Employee.findByPk(id);
    } catch (error) {
        throw new Error('Error getting employee by ID: ' + error.message);
    }
}

module.exports = {
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getAllEmployees,
    searchEmployees,
    getEmployeeById
};
