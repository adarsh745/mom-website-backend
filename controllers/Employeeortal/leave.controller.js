const Leaves = require("../../models/Employeeportal/Leaves.model")

//create leave 
async function applyLeave(req , res){
    try{
        console.log("this is from leave controller" , req.AccessDetails)
        const {leaveType ,reason , from , to , name , employeeId } =  req.body
        if(!name || !from || !to){
            return res.status(404).json({msg:"All fields are required" , status:false})
        } 
        const newLeave = new Leaves({
            name , 
            leaveType , 
            from , 
            to , 
            reason , 
            employeeId
        })
        await newLeave.save()
        res.json({msg:"sucessfully applied for leave" , status:true})

    }catch(error){
        console.log(error)
        res.status(500).json({msg:"Internal server error" , status:false , error})
    }
}

//get all leaves 
async function getAllLeaves(req, res){
    try{
        const allLeaves = await Leaves.find({})
        res.json({data:allLeaves, status:true})
    }catch(error){
        res.status(500).json({msg:"Internal server error" , status:false , error})
    }
}

async function approveLeave(req ,res){
    try{
        const {id} = req.params
        const approvedLeave = await Leaves.findOneAndUpdate({_id:id} , {status:"Approved"} , {new:true})
         res.json({data:approvedLeave, status:true})
    }catch(error){
        res.status(500).json({msg:"Internal server error" , status:false , error})
    }
}

async function cancelLeave(req ,res){
    try{
        const {id} = req.params
        const approvedLeave = await Leaves.findOneAndUpdate({_id:id} , {status:"Cancelled"} , {new:true})
         res.json({data:approvedLeave, status:true})
    }catch(error){
        res.status(500).json({msg:"Internal server error" , status:false , error})
    }
}

module.exports = {applyLeave , getAllLeaves ,approveLeave, cancelLeave}