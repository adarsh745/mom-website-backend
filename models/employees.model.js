const mongoose = require('mongoose');

const employeesSchema = new mongoose.Schema({
employeeId: {
    type: String,
    //required: true,
    unique: true
  },
  employeeName: {
    type: String,
    //required: true
  },
  employeedesignation: {
    type: String,
    //required: true
  },
  employeeUrl: {
    type: String,
    //required: true
  },
  key: {  
    type: String,
    required: false
  },
  Aboutemployee: {
    type: String
  },
  linkedin:{
    type:String,
    required:true
  },
  email:
  {
    type:String,
    required:true

  }

}, { timestamps: true });

module.exports = mongoose.model('Employee', employeesSchema);
