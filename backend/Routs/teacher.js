const express = require('express');
var router = express.Router();
var TeacherController = require('../Controllers/Teacher');
var fileUpload = require('../middleware/file-upload');

router.post('/createTeacher', TeacherController.createTeacher);
router.patch('/updatePassword', TeacherController.updatePassword);
router.get('/getTeacher/:id', TeacherController.getTeacher);
router.get('/getTeachers', TeacherController.getTeachers);
router.patch('/updateProfile', TeacherController.updateProfile);
router.patch('/applyExam', TeacherController.applyExam);
router.post('/paySalary', TeacherController.paySalary);
router.patch('/uploadPhoto',fileUpload.single('image'), TeacherController.uploadPhoto);

module.exports = router