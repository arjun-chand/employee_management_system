const express = require('express');
const router = express.Router();
const EmployeeService = require('../../service/EmployeeService/employeeService.service');

// Route to add a new employee
router.post('/emp/add', async (req, res) => {
    try {
        const employeeId = await EmployeeService.addEmployee(req.body);
        res.status(201).send("employee has been added successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

// Route to update an existing employee
router.put('/emp/update/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const success = await EmployeeService.updateEmployee(id, req.body);
        if (success) {
            res.status(200).json({ message: 'Employee updated successfully' });
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to delete an employee
router.delete('/emp/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const success = await EmployeeService.deleteEmployee(id);
        if (success) {
            res.status(200).json({ message: 'Employee deleted successfully' });
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get all employees
router.get('/emp/all', async (req, res) => {
    try {
        const employees = await EmployeeService.getAllEmployees();
        res.status(200).json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to search for employees
router.get('/emp/search/:key', async (req, res) => {
    const { key } = req.params;
    try {
        const employees = await EmployeeService.searchEmployees(key);
        res.status(200).json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get an employee by ID
router.get('emp/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await EmployeeService.getEmployeeById(id);
        if (employee) {
            res.status(200).json(employee);
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
