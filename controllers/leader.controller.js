const express = require("express");
const router = express.Router();
const Leader = require('../models/leader.model');

// Obtener la información de un líder por ID
router.get('/:id', async (req, res) => {
  try {
    const leader = await Leader.findById(req.params.id)
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