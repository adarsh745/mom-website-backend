const s3 = require('../config/s3')
const employeesSchema = require("../models/employees.model")
const { DeleteObjectCommand } = require("@aws-sdk/client-s3")

async function EmployeesDetails(req, res) {
    try {
        console.log("this is upload", req.file)
        const employeeUrl = req.file.location
        console.log("this is employee details" , req.body)
        const employeeId=Date.now().toString(32);
        const {employeeName ,employeedesignation,Aboutemployee,linkedin,email} = req.body
        if (!employeeUrl) {
            return res.status(404).json({ msg: "Please provide the img" })
        }
      
        const employeeimg = new employeesSchema({
            employeeId,
            employeeId,
            employeeUrl,
            Key: req.file.key,
            employeeName,
            employeedesignation,
            Aboutemployee,
            linkedin,
            email
        })

        console.log("linkedin",linkedin)

        await employeeimg.save()
        res.status(200).json({ msg: "uploaded successfully", status: true, data: employeeimg })

    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "Internal server error", error: err })
    }

}
async function getallemployee(req, res) {
    try {
        const { search, page = 1, limit = 6, sortBy = "createdAt", order = "desc", ...filters } = req.query;
        let query = {};
        if (search) {
            query.$or = [
                {employeeName : {$regex: search, $options: "i"}},
                {employeeId: {$regex: search, $options: "i"}},
                {employeedesignation: {$regex: search, $options: "i"}}
            ];
        }
        if (filters.supprotType) {
            query.supportType = filters.supportType;
        }
        const skip = (page - 1) * limit;
        const employee = await employeesSchema.find(query).sort({ [sortBy] : order === "desc" ? -1 : 1 }).skip(Number(skip)).limit(Number(limit));
        const total = await employeesSchema.countDocuments(query);
        res.status(200).json({ data: employee,total, page: Number(page), limit: Number(limit) });
    } catch (error) {
        res.status(500).json({ msg: "Internal server error", error })
    }
}
async function getemployeeById(req, res) {
    try{
        const {id} = req.params
        console.log(id)
        const getemployee = await employeesSchema.findOne({_id:id});
        console.log( getallemployee)
        res.status(200).json({employee:getemployee});
    }catch(error){
        res.status(500).json({msg:"Internal server error", error})
    }
}





// async function putemployeeById(req, res) {
//     const id = req.employeeId;
//     try {
//         // if (!req.body || typeof req.body !== 'object') {
//         //     return res.status(400).json({ message: "missing employee" });
//         // }
//         // const { employeeName, employeedesignation, Aboutemployee } = req.body;
//         const updatedEmployee = await Employee.findByIdAndUpdate(_id,req.body,
//             {
//                 // employeeName,
//                 // employeedesignation,
//                 // Aboutemployee
//                 new: true,
//                 runValidators: true
//             }
//         );
//         if (!updatedEmployee) {
//             return res.status(404).json({ message: "Employee not found" });
//         }
//         res.status(200).json({ message: "Employee updated successfully", employee: updatedEmployee });
//     } catch (error) {
//         console.error("Error updating Employee:", error);
//         res.status(500).json({ message: 'Server Error', error: error.message });
//     }
// } 

const putemployeeById = async (req, res) => {
  try {
    const updateData = {
      employeeName: req.body.employeeName,
      employeedesignation: req.body.employeedesignation,
      email: req.body.email,
      linkedin: req.body.linkedin,
      Aboutemployee: req.body.Aboutemployee,
    };

    if (req.file) {
      updateData.employeeUrl = req.file.location;
      updateData.key = req.file.key;
    }

    const updated = await employeesSchema.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "employee not found" });
    }

    res.status(200).json({ success: true, message: "employee updated", address: updated });
  } catch (error) {
    console.error("Update employee Error:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};





async function deleteemployee(req, res){
    try{
        console.log("Bucket: ", process.env.AWS_BUCKET_NAME)
        const fileKey = req.query.key
        const employeeId = req.params.id
        console.log("this is key file", fileKey)
        if(!fileKey){
            return res.status(400).json({msg:"File key doesn't match"})
        }
        const deleteEmployee = await employeesSchema.deleteOne({_id:employeeId})
        const params = {
            Bucket:process.env.AWS_BUCKET_NAME,
            Key:fileKey
        }
        await S3.send(new DeleteObjectCommand(params));
        res.status(200).json({msg:"Deleted successfully", status:true, deleteEmployee})
    }catch(error){
        console.log(error)
        res.status(500).json({msg:"Internal server error"})
    }
}

module.exports = {
    EmployeesDetails,
    getallemployee,
    getemployeeById,
    putemployeeById,
    deleteemployee,
}