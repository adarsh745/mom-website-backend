const Leaves = require("../../models/Employeeportal/Leaves.model")
const nodemailer=require('nodemailer')
const adminEmail=process.env.EMAIL

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "otpmompharmacy@gmail.com",
        pass: "kljosvcrerisevqm"
    }

})

//create leave 
async function applyLeave(req , res){
    try{
        console.log("this is from leave controller" , req.AccessDetails)
        const {leaveType ,reason , from , to , name , employeeId,email } =  req.body
        if(!name || !from || !to){
            return res.status(404).json({msg:"All fields are required" , status:false})
        } 
        const newLeave = new Leaves({
            name , 
            leaveType , 
            from , 
            to , 
            reason , 
            employeeId,
            email
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
        console.log("this is from env for mail",adminEmail);     
        const {id} = req.params

        const {email,from,to,name}=req.body
        console.log("this is email from the req.body",email);      

        const approvedLeave = await Leaves.findOneAndUpdate({_id:id} , {status:"Approved"} , {new:true})
        if(!email){
           res.json({data:approvedLeave,status:true})
        }
        else{
            let mailOptions = {
            from: adminEmail,
            to: email,
            subject: "Status for your leave appeal",
            text: `Hey ${name} your leave has been approved from ${from} to ${to} please  do not reply to this email`
        }
        transporter.sendMail(mailOptions,function(err,info){
             if (err) {
                return res.status(500).send({ msg: "Error in nodemailer", status: false, err })
            } else {
                console.log("Email is sent", info.response)
                return res.status(200).send({ msg: "Email is sent sucessfully", status: true,data:approvedLeave })
            }
        })
        }
    }catch(error){
        res.status(500).json({msg:"Internal server error" , status:false , error})
    }
}

async function cancelLeave(req ,res){
    try{  
        const {id} = req.params
        const{email,from,to,name}=req.body
        const approvedLeave = await Leaves.findOneAndUpdate({_id:id} , {status:"Cancelled"} , {new:true})
       if(!email){
            res.json({data:approvedLeave,status:true})
       }
       else{
            let mailOptions = {
            from: adminEmail,
            to: email,
            subject: "Status for your leave appeal",
            text: `Hey ${name} your leave has been denied from ${from} to ${to} please  do not reply to this email`
        }
        transporter.sendMail(mailOptions,function(err,info){
             if (err) {
                return res.status(500).send({ msg: "Error in nodemailer", status: false, err })
            } else {
                console.log("Email is sent", info.response)
                return res.status(200).send({ msg: "Email is sent sucessfully", status: true,data:approvedLeave })
            }
        })
       }
        
    }catch(error){
        res.status(500).json({msg:"Internal server error" , status:false , error})
    }
}

async function getLeavesbyUserId(req , res){
    try{
        // const {skip , limit} =  req.query
        // console.log("skip pages",skip , limit)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const skip = (page - 1) * limit;
        
        const {userId} = req.AccessDetails
        console.log("this is from leaves by user" , req.AccessDetails)
        const userLeaves = await Leaves.find({employeeId:userId}).sort({AppliedAt:-1}).skip(skip).limit(limit)
        res.json({leaves:userLeaves})
    }catch(error){
        res.status(500).json({msg:"Internal server error" , status:false , error})
    }
}

module.exports = {applyLeave , getAllLeaves ,approveLeave, cancelLeave , getLeavesbyUserId}