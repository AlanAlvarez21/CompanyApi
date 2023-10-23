const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({
    name: String,
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    },
    leader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      default: null,
    },
    is_current_leader: {
      type: Boolean,
      ref: 'Employee',
      default: false,
    },
},  
  { strictPopulate: false },
);

module.exports = mongoose.model('Employee', employeeSchema);