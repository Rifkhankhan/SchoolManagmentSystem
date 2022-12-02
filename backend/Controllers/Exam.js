const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Exam = require("../Models/Exam");


const createExam = async (req, res, next) => {

    const {name,classes,fees,place,teachers}  = req.body;

	const newExam = new Exam({
		name:name,
        teachers:teachers,
        students:0,
        classes:classes,
        fees:fees,
        date:Date.now().toString(),
        place:place,
        active:true
	});
	console.log(newExam);

	try {
		await newExam.save();
	} catch (err) {
		const error = new HttpError('Creating newExam failed,try again', 500);
		return next(error);
	}
	res.json({ newExam: newExam.toObject({ getters: true }) });
};

const updateExam = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { name,fees,place,classes,teachers,id,date,active} = req.body;

  let exam;

  try {
    exam = await Exam.findById(id);
  } catch (err) {
    const error = new HttpError("User is not there provided by the id", 500);
    return next(error);
  }

    exam.name = name,
    exam.teachers = teachers,
    exam.classes = classes,
    exam.fees = fees,
    exam.date = date,
    exam.place = place
    exam.active = active

  try {
    console.log(exam);
    await exam.save();
  } catch (err) {
    const error = new HttpError("Updated exam is not saved ", 500);
    return next(error);
  }

  res.status(200).json({
    message: "Updated exam Successfully",
    exam: exam.toObject({ getters: true }),
  });
};

const getExam = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
	}

	const {id} = req.params;

	let user;

	try {
		user = await Exam.findById(id);
	} catch (err) {
		const error = new HttpError('finding user failed bt id,try again', 500);
		return next(error);
	}

	if (!user) {
		res.status(201).json({ message: 'There is no user ' });
	} else {
    console.log(user);
		return res.status(201).json(user.toObject({ getters: true }));
	}
};


exports.createExam = createExam;
exports.updateExam = updateExam;
exports.getExam = getExam;


