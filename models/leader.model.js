const mongoose = require("mongoose")
  
const leaderSchema = new mongoose.Schema({
    name: String,
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
    },
    employees: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
    }],
});


const Leader = mongoose.model('Leader', leaderSchema);
