const express = require("express");
const router = express.Router();
const Department = require('../models/departament.model');

// Create a new department
router.post('/', async (req, res) => {
    try {
      const department = new Department(req.body);
      await department.save();
      res.status(201).json({ message: 'Department created successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
  
  // Update a department by ID
router.put('/:id', async (req, res) => {
    try {
        const department = await Department.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
        );
        if (!department) {
        return res.status(404).json({ error: 'Department not found' });
        }
        res.json({ message: 'Department updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Obtener la información de un departamento por ID
router.get('/:id', async (req, res) => {
    try {
    const department = await Department.findById(req.params.id)
        // .populate('leader')
        // .populate('employees');
    if (!department) {
        return res.status(404).json({ error: 'Department not found' });
    }
    res.json(department);
    } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Obtener la información de un departamento por ID
router.get('/', async (req, res) => {
    try {
    const department = await Department.find()
        // .populate('leader')
        // .populate('employees');
    if (!department) {
        return res.status(404).json({ error: 'Department not found' });
    }
    res.json(department);
    } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Mover empleados de un departamento a otro
router.put('/move-employees', async (req, res) => {
  try {
    const { employeeIds, fromDepartmentId, toDepartmentId } = req.body;

    // Remove employees from the source department
    await Department.findByIdAndUpdate(
      fromDepartmentId,
      { $pullAll: { employees: employeeIds } }
    );

    // Add employees to the target department
    await Department.findByIdAndUpdate(
      toDepartmentId,
      { $addToSet: { employees: employeeIds } }
    );

    res.json({ message: 'Employees moved successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a department by ID
router.delete('/:id', async (req, res) => {
    try {
      const department = await Department.findByIdAndDelete(req.params.id);
      if (!department) {
        return res.status(404).json({ error: 'Department not found' });
      }
      res.json({ message: 'Department deleted successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;