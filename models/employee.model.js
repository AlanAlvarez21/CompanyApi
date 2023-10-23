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
      ref: 'Leader',
      default: null,
    },
});

module.exports = mongoose.model('Employee', employeeSchema);