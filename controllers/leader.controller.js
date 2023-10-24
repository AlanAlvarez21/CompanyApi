const express = require("express");
const router = express.Router();
const Employee = require('../models/employee.model');

// Obtener la información de un líder por ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate('department', 'name') // Popula el campo 'department' y selecciona solo el campo 'name'
      .populate('company', 'name') // Popula el campo 'company' y selecciona solo el campo 'name'
      .populate('employees', 'name') // Popula el campo 'company' y selecciona solo el campo 'name'
      .exec();

    if (!employee) {
      return res.status(404).json({ error: 'Leader not found' });
    }

    const isCurrentLeader = employee.is_current_leader;
    
    // Si el empleado es líder, actualiza el campo 'is_current_leader' a true
    if (isCurrentLeader) {
      employee.is_current_leader = true;
      await employee.save();
    }

    res.json({ employee, isCurrentLeader });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Obtener lideres
router.get('/', async (req, res) => {
    try {
      const leader = await Leader.find()
        .populate('department')
        .populate('employees');
      if (!leader) {
        return res.status(404).json({ error: 'Leader not found' });
      }
      res.json(leader);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Mover un líder a otro departamento
router.put('/move-leader', async (req, res) => {
  try {
    const { leaderId, fromDepartmentId, toDepartmentId } = req.body;

    // Remove leader from the source department
    await Department.findByIdAndUpdate(
      fromDepartmentId,
      { leader: null }
    );

    // Assign leader to the target department
    await Department.findByIdAndUpdate(
      toDepartmentId,
      { leader: leaderId }
    );

    res.json({ message: 'Leader moved successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;