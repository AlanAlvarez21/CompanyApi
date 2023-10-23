const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Employee = require('../models/employee.model');

// Get an employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate('department', 'name')
      .populate('employees', 'name')
      .populate('company', 'name')
      .populate('leader', 'name');
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    // Verificar si el usuario actual es líder
    // const isLeader = employee.leader.toString() === req.user.id;
    // Devolver la respuesta con la información del empleado y si el usuario es líder
    res.json({ employee });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    if (!employees) {
      return res.status(404).json({ error: 'Employees not found' });
    }
    res.json(employees);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new employee
router.post('/', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json({ message: 'Employee created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update an employee by ID
router.put('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json({ message: 'Employee updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete an employee by ID
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;