const mongoose = require("mongoose")

const departmentSchema = new mongoose.Schema({
    name: String,
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
  

module.exports = mongoose.model('Department', departmentSchema);
