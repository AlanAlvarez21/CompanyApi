const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      default: null,
    },
    leader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      default: null,
    },
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        default: null,
      },
    ],
  },
  { strictPopulate: false }
);

module.exports = mongoose.model('Department', departmentSchema);