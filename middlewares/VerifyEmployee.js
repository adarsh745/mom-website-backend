const jwt=require('jsonwebtoken')

async function verifyEmployee(req,res,next){

    try{
      const token=req.headers.authorization.split(" ")[1]
      console.log("this is from middleware" , token)
      if(!token){
        return res.status(401).json({msg:"invalid access"})
      }
      const decode= await jwt.decode(token,process.env.JWT_SECRET)
      req.AccessDetails=decode
      next()
    }
    catch(e){

         console.log("Internal server Error from Employee Middleware",e);         
    }
}

module.exports = verifyEmployee