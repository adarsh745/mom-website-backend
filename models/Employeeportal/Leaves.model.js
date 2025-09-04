const mongoose = require("mongoose")

const leaveSchema = new mongoose.Schema({
    name:{
        type:String , 
        required:true
    } , 
    employeeId:{
        type:String , 
        required:true
    },
    leaveType:{
        type:String , 
        required:true
    } ,
    reason:{
        type:String ,  
    } , 
    from:{
        type:Date ,  
    },
    to:{
        type:Date 
    },
    status:{
        type:String , 
        enum:["Pending" , "Approved" , "Cancelled"],
        default:"Pending"
    },
    ApprovedBy:{
        type:String ,
    },
    AppliedAt:{
        type:Date , 
        default:Date.now()
    }

})

const Leaves = mongoose.model("Leaves" , leaveSchema)

module.exports = Leaves