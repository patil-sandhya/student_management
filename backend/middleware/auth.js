const jwt = require("jsonwebtoken")
require("dotenv").config()

const auth = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1]
    if(token){
        jwt.verify(token, process.env.secretKey, (err,decoded)=>{
            if(decoded){
              next()
            }else{
              res.send(err)
            }
          })
    }else{
        res.send({"msg": "You are not authorised!"})
    }
    
}

module.exports={
    auth
}