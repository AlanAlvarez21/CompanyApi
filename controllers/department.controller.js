const express = require("express");
const router = express.Router();
const Department = require('../models/department.model');
const Company = require('../models/company.model');
const Employee = require('../models/company.model');


// Obtener todos los departamentos con el ID de compañía proporcionado
router.get('/company/:companyId', async (req, res) => {
  try {
    const companyId = req.params.companyId; // Obtener el ID de compañía de los parámetros de la solicitud
    const departments = await Department.find({ company: companyId }) // Buscar los departamentos con el ID de compañía proporcionado
    .populate('leader', 'name')
    .populate('employees', 'name');
    res.json(departments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new route to get employees and leaders from one department
router.get('/:id/employees-leaders', async (req, res) => {
  try {
    const departmentId = req.params.id;

    // Find the department by ID and populate the leader and employees
    const department = await Department.findById(departmentId)
      .populate('leader', 'name')
      .populate('employees', 'name');

    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

    // Extract and return just the leader and employees
    const { leader, employees } = department;
    res.json({ leader, employees });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

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
        .populate('leader')
        .populate('employees');
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
        .populate('leader')
        .populate('employees')
    if (!department) {
        return res.status(404).json({ error: 'Department not found' });
    }
    res.json(department);
    } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Agregar un empleado a un departamento específico
router.post('/:id/add-employee', async (req, res) => {
  try {
    const departmentId = req.params.id;
    const { name, is_current_leader } = req.body;

    // Encuentra el departamento por ID
    const departmentResponse = await Department.findById(departmentId);

    if (!departmentResponse) {
      return res.status(404).json({ error: 'Department not found' });
    }

    // Crea un nuevo empleado con el nombre proporcionado y establece is_current_leader en false por defecto
    const newEmployee = new Employee({
      name: name,
      department: departmentId,
      company: departmentResponse.company.toString(),
      is_current_leader: is_current_leader,
    });

    // Guarda el nuevo empleado en la base de datos
    await newEmployee.save();

    console.log('Nuevo empleado guardado:', newEmployee);

    // Agrega el ID del nuevo empleado a la lista de empleados del departamento utilizando $push
    await Department.findByIdAndUpdate(departmentId, {
      $push: { employees: newEmployee._id },
    });

    console.log('Departamento actualizado:', await Department.findById(departmentId));

    res.status(201).json({ message: 'Employee added to department successfully', employee: newEmployee });
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