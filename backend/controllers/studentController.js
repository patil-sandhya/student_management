const StudentModel = require('../models/studentModel');
const UserModel = require('../models/userModel');

exports.createStudent = async (req, res) => {
   const {enrlDate,course,name, email} =req.body
    console.log(req.body)
    try{
        const user = await UserModel.findOne({email});
        if(user){
            return  res.status(400).send({ msg: "Email already exists" });
        }else{
            const newUser = new UserModel({
                name,
                email,
                password: "CreatedByAdmin",
                role: "student"
            });
            await newUser.save();
            const student = new StudentModel({
                enrlDate,course, userId: newUser._id
            });
            await student.save();
            res.status(200).send({ msg: "Student created successfully", student });
        }
    }catch (error) {
      res.status(400).send({ msg: "Failed to create student" });
    }
}

exports.getStudents = async (req, res) => {
    try {
        // pagination: ?page=<page>&limit=<limit>
        let { page = 1, limit = 5 } = req.query;
        page = parseInt(page, 10);
        limit = parseInt(limit, 10);
        if (isNaN(page) || page < 1) page = 1;
        if (isNaN(limit) || limit < 1) limit = 5;
        const skip = (page - 1) * limit;

        const [students, total] = await Promise.all([
            StudentModel.find()
                .populate('userId', 'name email _id')
                .skip(skip)
                .limit(limit),
            StudentModel.countDocuments()
        ]);

        const fileredData = students.map(student => ({
            userId: student.userId._id,
            enrlDate: student.enrlDate,
            course: student.course,
            name: student.userId.name,
            email: student.userId.email,
            studentId: student._id
        }));
        console.log("fileredData",fileredData);
        const totalPages = Math.max(1, Math.ceil(total / limit));
        res.status(200).send({ students: fileredData, page, limit, totalPages, total });
    } catch (error) {
        console.error("fetch student",error);
      res.status(400).send({ msg: "Failed to fetch students" });
    }
}

exports.updateStudent = async (req, res) => {
    const {id} = req.params;
    const {course, name, email} = req.body;
    try {
        const student = await StudentModel.findByIdAndUpdate(id, {course}, {new: true});
        const user = await UserModel.findByIdAndUpdate(student.userId, {name, email}, {new: true});
        res.status(200).send({ msg: "Student updated successfully", student });
    } catch (error) {
        res.status(400).send({ msg: "Failed to update student" });
    }
}

exports.deleteStudent = async (req, res) => {
    const {id} = req.params;
    try{
        const student = await StudentModel.findByIdAndDelete(id);
        await UserModel.findByIdAndDelete(student.userId);
        res.status(200).send({ msg: "Student deleted successfully" });
    }catch (error) {
        res.status(400).send({ msg: "Failed to delete student" });
    }
}

// Get student by userId (used by route: GET /:userId)
exports.getStudentByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const student = await StudentModel.findOne({ userId }).populate('userId', 'name email -_id');
        if (!student) return res.status(404).send({ msg: "Student not found" });
        res.status(200).send({ student });
    } catch (error) {
        res.status(400).send({ msg: "Failed to fetch student" });
    }
}
