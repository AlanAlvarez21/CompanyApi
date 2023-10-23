const express = require("express");
const router = express.Router();
const Company = require('../models/company.model');

// Create a new company
router.post('/', async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).json({ message: 'Company created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all companies
router.get('/', async (req, res) => {
  try {
    const companies = await Company.find()
      .populate('departments') // Populate the employees field
      .populate('employees') // Populate the departments field
    res.json(companies);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a company by ID
router.get('/:id', async (req, res) => {
    console.log(req.params.id)
  try {
    const company = await Company.findById(req.params.id)
      .populate('employees'); // Populate the employees field
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.json(company);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Update a company by ID
router.put('/:id', async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.json({ message: 'Company updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a company by ID
router.delete('/:id', async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;