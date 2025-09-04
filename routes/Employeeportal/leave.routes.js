const express = require("express")
const { applyLeave, getAllLeaves, approveLeave } = require("../../controllers/Employeeortal/leave.controller")
const verifyEmployee = require("../../middlewares/VerifyEmployee")
const router = express()

//get all leaves for admin
router.get("/leaves" ,  getAllLeaves)

//apply leave by user 
router.post("/leave/apply" , verifyEmployee, applyLeave)

//approve leave by admin
router.put("/leave/approve/:id" , approveLeave)

// cancel leave by admin
router.put("/leave/cancel/:id" , approveLeave)

// delete leave by user
// router.delete("/leave/delete/:id" , )

module.exports = router