const express=require("express")
const cors=require("cors")
const session=require("express-session")
const connectDb=require('./config/db') //from config folder db.jd file
require('dotenv').config();
const fileUpload = require('express-fileupload');

const ContactUs = require("./routes/contactUsRoutes")
const invest = require("./routes/investor.route")
const JobRoute =require("./routes/jobRoutes")
const WebPrescriptionRoutes = require("./routes/WebPrescriptionRoutes")
const EarlyAccess = require("./routes/EarlyAccessRoutes")
const Pincode = require("./routes/WebPincodeRouter")
const employee = require("./routes/employeesRoutes")
const AdminRoutes = require("./routes/Authentication.routes")
const jobDetails=require("./routes/jobDetailsRoutes")
const userRoutes=require("./routes/Employeeportal/userRoutes")
const EmployeeRoutes=require('./routes/Employeeportal/EmployeeRoutes')
const leaveRoutes = require("./routes/Employeeportal/leave.routes")


const port=process.env.PORT || 3001
const sec = process.env.JWT_SECRET
console.log(`this ${sec}`)

connectDb() 
const app=express()
app.use(cors({
    origin:"http://localhost:5173" ,
    origin:"http://localhost:5174" ,
    credentials:true
}))
app.use(express.json())
// app.use(fileUpload({
//   useTempFiles:true,
//  tempFileDir: "/tmp/",})
// )

app.use(session({
    secret:'medicine on minutes',  //used to sign the cookie
    resave: false,                //dont save session if unmodified
    saveUninitialized:false,     //dont create session until something is stored
    cookie: {
        maxAge:1000*60*60,      //1 hour
        secure:false,          //true if using https
        httpOnly:true         //cant access cookie via JS
    }
}))

app.get("/", (req, res)=>{
    res.send("your server is ready")
})

app.use('/api/invest',invest)
app.use("/contactus", ContactUs)
app.use("/job",JobRoute)
app.use("/UploadPrescription",WebPrescriptionRoutes)
app.use("/EarlyAccess",EarlyAccess)
app.use("/pincode",Pincode)
app.use('/employee',employee)

//authentication routes 
app.use("/api" , AdminRoutes)

app.use('/job',jobDetails)


//Employeeportal routes
app.use("/api" , userRoutes)
app.use("/api" ,EmployeeRoutes)
//leave routes
app.use("/api" ,  leaveRoutes)


app.listen(port,()=>{
    console.log(`app is listening at http://localhost:${port}`)
    console.log(`this ${sec}`)
})
