const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/enroll', studentController.createStudent);
router.get('/all', studentController.getStudents);
router.get('/:userId', studentController.getStudentByUserId);  
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);


module.exports = router;