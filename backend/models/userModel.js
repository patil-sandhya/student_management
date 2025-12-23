const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {type: String, default: "user"}
},{
    versionKey:false
})


const UserModel = mongoose.model("User", userSchema)
module.exports = UserModel;