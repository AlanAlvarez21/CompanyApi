const mongoose = require('mongoose');
const Employee = require('./models/employee.model');
const Company = require('./models/company.model');
const Department = require('./models/department.model');

mongoose.connect('mongodb+srv://alandanielalvarez0000:U2qsMprHbi7jeP3C@cluster0.mhhjeoy.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=> {
  console.log('connected')
  seedData()
})
.catch(e=>console.log(e));

const seedData = async () => {
  try {
    // Create companies
    const company1 = new Company({
      name: 'LexGo',
      location: 'México',
      industry: 'Technology',
    });
    await company1.save();

    // Create departments
    const departmentA = new Department({
      name: 'HR',
      company: company1._id,
      employees: [],
    });
    await departmentA.save();

    const departmentB = new Department({
      name: 'Finance',
      company: company1._id,
      employees: [],
    });
    await departmentB.save();

    const departmentC = new Department({
      name: 'IT',
      company: company1._id,
      employees: [],
    });
    await departmentC.save();

    // Create employees
    const employee1 = new Employee({
      name: 'John Doe',
      department: departmentA._id,
      company: company1._id,
      leader: null,
      is_current_leader: true,
    });
    await employee1.save();

    const employee2 = new Employee({
      name: 'Jane Smith',
      department: departmentB._id,
      company: company1._id,
      leader: employee1._id,
      is_current_leader: false,
    });
    await employee2.save();

    const employee3 = new Employee({
      name: 'Mike Johnson',
      department: departmentC._id,
      company: company1._id,
      leader: employee1._id,
      is_current_leader: false,
    });
    await employee3.save();

    const employee4 = new Employee({
      name: 'Juan Pérez',
      department: departmentB._id,
      company: company1._id,
      leader: null,
      is_current_leader: false,
    });
    await employee4.save();

    const employee5 = new Employee({
      name: 'Alan Daniel',
      department: departmentB._id,
      company: company1._id,
      leader: null,
      is_current_leader: false,
    });
    await employee5.save();

    const employee6 = new Employee({
      name: 'Carlo',
      department: departmentC._id,
      company: company1._id,
      leader: null,
      is_current_leader: true,
    });
    await employee6.save();

    const employee7 = new Employee({
      name: 'Marcos',
      department: departmentC._id,
      company: company1._id,
      leader: employee6._id,
      is_current_leader: false,
    });
    await employee7.save();

    const employee8 = new Employee({
      name: 'Luisa',
      department: departmentC._id,
      company: company1._id,
      leader: employee6._id,
      is_current_leader: false,
    });
    await employee8.save();

    // Update departmentA
    await Department.findByIdAndUpdate(departmentA._id, {
      leader: employee1._id,
      employees: [employee2._id, employee3._id],
      company: company1._id,
    });

    // Update departmentB
    await Department.findByIdAndUpdate(departmentB._id, {
      employees: [employee4._id, employee5._id],
      company: company1._id,
    });

    // Update departmentC
    await Department.findByIdAndUpdate(departmentC._id, {
      leader: employee6._id,
      company: company1._id,
      employees: [employee7._id, employee8._id],
    });

    console.log('Seed data created successfully');
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
};

