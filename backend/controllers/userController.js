const UserModel = require('../models/userModel');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.createUser = async (req, res) => {
   const {name,email,password,role} =req.body
    console.log(req.body)
    try {
      let userExist = await UserModel.findOne({email})
      if(userExist){
        if(userExist.password === "CreatedByAdmin"){
          const hashedPassword = await bcrypt.hash(password, 5)
          let updatedUser = await UserModel.findByIdAndUpdate({_id:userExist._id},{name,password:hashedPassword})
          console.log("updatedUser",updatedUser)
            return res.status(200).json({msg:"User created, please login"})
        }else{
        res.status(200).json({msg:"User already exist, please login"})

        }
      }else{
        bcrypt.hash(password, 5, async(err,hash)=>{
          console.log("hash")
            if(err){
                res.send(err)
            }else{
                const user = new UserModel({
                    name,email,
                    password:hash,
                    role
                });
                await user.save();
                res.status(200).send({ msg: "New user registered", newUser: req.body });
            }
        })
      }
    
      
    } catch (error) {
      res.status(400).send({"err":error});
    }
}

exports.loginUser = async (req, res) => {
  let {email,password}=req.body
    try {
        const user = await UserModel.findOne({email})
        if(user){
          if(user.password === "CreatedByAdmin"){
            return res.status(400).send({ msg: "Account does not exist" });
          }
        bcrypt.compare(password, user.password, (err, result)=>{
            if(err){
                res.status(400).send({ msg: "please try again later" });
            }else
            if(result == true){
                const token = jwt.sign({user:user},process.env.secretKey,{expiresIn:3600})
                const data = {
                  "token":token, 
                  "name":user.name, 
                  "role": user?.role,
                  "email":user.email, 
                  "userid":user._id
                }
                res.status(200).send({ msg: "Login successfull", data });
            }else{
              res.status(400).send({ msg: "invalid credential" });
            }

        })
        }else{
      res.status(400).send({ msg: "invalid credential" });

        }
    } catch (error) {
        console.log(error)
    }
};

exports.logoutUser = async (req, res)=>{
     const token = req.headers.authorization?.split(" ")[1]
  try {
    blacklist.push(token)
    res.status(200).send({ msg: "logout"});

  } catch (error) {
    res.status(400).send({ "error": error});
    
  }
}

exports.updateUser = async (req, res)=>{
  const userid = req.params.userid
  const payload = req.body
    try {
        await UserModel.findByIdAndUpdate({_id:userid},payload)
        res.status(200).send({ msg: "user details updated"})
    } catch (error) {
        res.status(400).send({ "error": error});
    }
}
