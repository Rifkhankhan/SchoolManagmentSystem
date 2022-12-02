const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const uuid = require('uuid/v4');
const Course = require("../Models/Course");

const createCourse = async (req, res, next) => {

    const {name,duration,fees,classes,place}  = req.body;

	const newCourse = new Course({
		name:name,
        active:true,
        classes:classes,
        courseCode:uuid(),
        duration:duration,
        fees:fees,
        place:place,
        students:0,
	});

	try {
		await newCourse.save();
	} catch (err) {
		const error = new HttpError('Creating newStudent failed,try again', 500);
		return next(error);
	}
	res.json({ newCourse: newCourse.toObject({ getters: true }) });
};

const updateCourse = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { name,fees,duration,classes,place ,id,active,teachers,courseCode} = req.body;

  let course;

  try {
    course = await Course.findById(id);
  } catch (err) {
    const error = new HttpError("course is not there provided by the id", 500);
    return next(error);
  }

    course.name = name;
    course.courseCode = courseCode;
    course.active = active;
    course.fees = fees,
    course.duration = duration;
    course.classes = classes;
    course.place = place;

  try {
    console.log(course);
    await course.save();
  } catch (err) {
    const error = new HttpError("Updated Password is not saved ", 500);
    return next(error);
  }

  res.status(200).json({
    message: "Updated course Successfully",
    course: course.toObject({ getters: true }),
  });
};

const getCourse = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
	}

	const {id} = req.params;

	let course;

	try {
		course = await Course.findById(id);
	} catch (err) {
		const error = new HttpError('finding user failed bt id,try again', 500);
		return next(error);
	}

	if (!course) {
		res.status(201).json({ message: 'There is no course ' });
	} else {
    console.log(course);
		return res.status(201).json(course.toObject({ getters: true }));
	}
};



  
  
exports.createCourse = createCourse;
exports.getCourse = getCourse;
exports.updateCourse = updateCourse;

