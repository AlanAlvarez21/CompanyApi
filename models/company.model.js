const mongoose = require("mongoose")

const companySchema = new mongoose.Schema({
    name: String,
    employees: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee', 
    },
    departments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department', 
    },
    employees: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
    },
  },
    { strictPopulate: false },
);
  
module.exports = mongoose.model('Company', companySchema);
