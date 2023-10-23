const mongoose = require("mongoose")

const companySchema = new mongoose.Schema({
    name: String,

});
  
  
const Company = mongoose.model('Company', companySchema);
