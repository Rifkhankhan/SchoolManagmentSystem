const express = require('express');
var router = express.Router();
var StudentController = require('../Controllers/Student');
var fileUpload = require('../middleware/file-upload');

router.post('/createStudent', StudentController.createStudent);
router.get('/students', StudentController.getStudents);
router.patch('/updatePassword', StudentController.updatePassword);
router.get('/getStudent/:id', StudentController.getStudent);
router.patch('/updateProfile', StudentController.updateProfile);
router.patch('/applyExam', StudentController.applyExam);
router.patch('/applyCourse', StudentController.applyCourse);
router.patch('/uploadPhoto',fileUpload.single('image'), StudentController.uploadPhoto);

module.exports = router;
