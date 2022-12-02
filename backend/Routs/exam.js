const express = require('express');
var router = express.Router();
var ExamController = require('../Controllers/Exam');

router.post('/createExam', ExamController.createExam);
router.patch('/updateExam', ExamController.updateExam);
router.get('/getExam/:id', ExamController.getExam);

module.exports = router;
