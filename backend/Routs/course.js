const express = require('express');
var router = express.Router();
var CourseController = require('../Controllers/Course');

router.post('/createCourse', CourseController.createCourse);
router.patch('/updateCourse', CourseController.updateCourse);
router.get('/getCourse/:id', CourseController.getCourse);

module.exports = router;
