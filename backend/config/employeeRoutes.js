const express = require('express');
const router = express.Router();
const Employee = require('../db/models/Employee.model');

// Add Employee
router.post("/emp/add", async (req, res) => {
    try {
        const employee = new Employee(req.body);
        let result = await employee.save();
        console.log(result);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Update Employee
router.put("/emp/update/:id", async (req, res) => {
    const response = await Employee.updateOne(
        {_id:req.params.id},
        {
            $set: req.body
        })
        res.send(response);
});

// Delete Employee
router.delete("/delete/:id", async (req, res) => {
    try {
        const response = await Employee.deleteOne({ _id: req.params.id })
        if (response.deletedCount === 1) {
            // If successful, send a success message
            res.json({ message: "Employee deleted successfully" });
        } else {
            // If the employee with the given ID was not found, send a 404 error
            res.status(404).json({ error: "Employee not found" });
        }
    } catch (error) {
        // If an error occurred during the deletion process, send a 500 error
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/emp/allEmployees', async(req, res)=>{
    let employees = await Employee.find();
    if (employees.length > 0) {
        res.send(employees);
    } else {
        res.send({ error: "no employee found" })
    }
})

router.get('/emp/search/:key', async (req, res) => {
    const response = await Employee.find({
        "$or": [
             {name: { $regex: req.params.key, $options: 'i'}},
             {country: { $regex: req.params.key, $options: 'i'}},
             {state: { $regex: req.params.key, $options: 'i'}},
             {city: { $regex: req.params.key, $options: 'i'}},
             {hobbies: { $regex: req.params.key, $options: 'i'}},
             
            ]
       })
       res.send(response);
})
router.get('/emp/employeeDetail/:id', async (req, res) => {
    try {
        const response = await Employee.findOne({ _id: req.params.id });
        if (response) {
            res.send(response);
        } else {
            res.status(404).send({ error: "Employee not found" });
        }
    } catch (error) {
        console.error("Error fetching Employee:", error);
        res.status(500).send({ error: "Internal server error" });
    }
});
module.exports = router;
