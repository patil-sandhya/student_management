const mongoose = require("mongoose")

const studentSchema = mongoose.Schema({
    enrlDate: Date,
    course: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
},{
    versionKey:false
})


const StudentModel = mongoose.model("Student", studentSchema)
module.exports = StudentModel;