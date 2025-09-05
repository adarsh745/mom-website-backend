const express = require("express")
const { applyLeave, getAllLeaves, approveLeave, getLeavesbyUserId,cancelLeave } = require("../../controllers/Employeeortal/leave.controller")
const verifyEmployee = require("../../middlewares/VerifyEmployee")
const router = express()

//get all leaves for admin
router.get("/leaves" ,  getAllLeaves)

router.get('/leavebyuser' ,verifyEmployee , getLeavesbyUserId )

//apply leave by user 
router.post("/leave/apply" , verifyEmployee, applyLeave)

//approve leave by admin
router.put("/leave/approve/:id" , approveLeave)

// cancel leave by admin
router.put("/leave/cancel/:id" , cancelLeave)

// delete leave by user
// router.delete("/leave/delete/:id" , )

module.exports = router