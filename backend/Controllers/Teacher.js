const Teacher = require('../Models/Teacher');
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const Student = require("../models/Student");
const uuid = require('uuid/v4');
const Course = require("../Models/Course");
const Exam = require("../Models/Exam");
const Salary = require('../Models/Salary');


const createTeacher = async (req, res, next) => {

    const {name,grade,gender,age,mobile,address,email,dob}  = req.body;

	const newTeacher = new Teacher({
		name:name,
        active:true,
        address:address,
        age:age,
        dob:dob,
        email:email,
        genter:gender,
        password:'123456',
        grade:grade,
        mobile:mobile,
        teacherId:uuid()
	});
	console.log(newTeacher);

	try {
		await newTeacher.save();
	} catch (err) {
		const error = new HttpError('Creating newTeacher failed,try again', 500);
		return next(error);
	}
	res.json({ newTeacher: newTeacher.toObject({ getters: true }) });
};
 
const updatePassword = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { currentPassword, newPassword, userId } = req.body;

  console.log(req.body);
  let validCurrentPassword = false;
  let user;
  console.log(userId);

  try {
    user = await Teacher.findById(userId);
  } catch (err) {
    const error = new HttpError("User is not there provided by the id", 500);
    return next(error);
  }
  console.log(user);
  try {
    validCurrentPassword = await bcrypt.compare(currentPassword, user.password);
    console.log(validCurrentPassword);
  } catch (err) {
    const error = new HttpError("Something went Wrong in Comparing old password", 500);
    return next(error);
  }

  if(!validCurrentPassword){
    const error = new HttpError("Current Password is not correct", 500);
    return next(error);
  }

  let hasNewPassword;
  try {
    hasNewPassword = await bcrypt.hash(newPassword, 12);
  } catch (err) {
    const error = new HttpError("User is not there provided by the id", 500);
    return next(error);
  }

    user.password = hasNewPassword;

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError("Updated Password is not saved ", 500);
    return next(error);
  }

  res.status(200).json({
    message: "Updated Password Successfully",
    user: user.toObject({ getters: true }),
  });
};

const updateProfile = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { email,name,genter,address,mobile,dob,id,age,course,classes } = req.body;

  let user;
  let courses;

  try {
    user = await Teacher.findById(id);
  } catch (err) {
    const error = new HttpError("User is not there provided by the id", 500);
    return next(error);
  }


  
  try {
    courses = await Course.find();
  } catch (err) {
    const error = new HttpError("User is not there provided by the id", 500);
    return next(error);
  }


    user.email = email;
    user.name = name,
    user.address = address;
    user.dob = dob;
    user.genter = genter;
    user.age = age;
    user.mobile = mobile;
    user.courses.push(course);
    user.classes = classes;

    courses.teachers.push(id);

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError("Updated Password is not saved ", 500);
    return next(error);
  }

  
  try {
    await courses.save();
  } catch (err) {
    const error = new HttpError("Updated Password is not saved ", 500);
    return next(error);
  }

  res.status(200).json({
    message: "Updated profile Successfully",
    user: user.toObject({ getters: true }),
    courses: courses.toObject({ getters: true }),
  });
};

const getTeacher = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
	}

	const {id} = req.params;

	let user;

	try {
		user = await Teacher.findById(id);
	} catch (err) {
		const error = new HttpError('finding user failed bt id,try again', 500);
		return next(error);
	}

	if (!user) {
		res.status(201).json({ message: 'There is no Teacher ' });
	} else {
    console.log(user);
		return res.status(201).json(user.toObject({ getters: true }));
	}
};

const applyExam = async (req,res,next) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      throw new HttpError("Invalid inputs passed, please check your data.", 422);
    }
  
    const { examId, money, userId } = req.body;
  
   
    let user;
    let exam;
  
    try {
      user = await Teacher.findById(userId);
    } catch (err) {
      const error = new HttpError("User is not there provided by the id", 500);
      return next(error);
    }
    
    user.exams.push(examId);
    
    try {
        exam = await Exam.findById(examId);
    } catch (err) {
        const error = new HttpError("Course is not there provided by the id", 500);
        return next(error);
    }

    exam.teachers.push(userId);


    try {
      await user.save();
    } catch (err) {
      const error = new HttpError("Updated Password is not saved ", 500);
      return next(error);
    }

    try {
        await exam.save();
      } catch (err) {
        const error = new HttpError("Updated Password is not saved ", 500);
        return next(error);
      }
    
  
    res.status(200).json({
      message: "Done Successfully",
      user: user.toObject({ getters: true }),
      exam:exam.toObject({getters:true})
    });
};

const paySalary = async (req,res,next) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      throw new HttpError("Invalid inputs passed, please check your data.", 422);
    }
  
    const {  money, userId } = req.body;
  

    const newSalary = new Salary ({
        date:Date.now().toString(),
        money:money,
        userId:userId,
    })

    try {
      await newSalary.save();
    } catch (err) {
      const error = new HttpError("Updated Password is not saved ", 500);
      return next(error);
    }
    let user;

    try {
      user = await Teacher.findById(userId);
    } catch (err) {
      const error = new HttpError('finding user failed bt id,try again', 500);
      return next(error);
    }

    user.salary.push({
      date:Date.now().toString(),
      money:money
    })
      
	try {
		await user.save();
	} catch (err) {
		const error = new HttpError('Creating newTeacher failed,try again', 500);
		return next(error);
	}
    res.status(200).json({
      message: "Salary paid Successfully",
      newSalary:newSalary.toObject({getters:true}),
      user:user.toObject({getters:true})
    });
}
  
const uploadPhoto = async (req,res,next) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      throw new HttpError("Invalid inputs passed, please check your data.", 422);
    }
  
    const {  userId } = req.body;
  
   
    let user;
 
  
    try {
      user = await Teacher.findById(userId);
    } catch (err) {
      const error = new HttpError("User is not there provided by the id", 500);
      return next(error);
    }
    
    const url = req.protocol + '://' + req.get('host');
    user.image = url + '/uploads/' + req.file.filename

    try {
      await user.save();
    } catch (err) {
      const error = new HttpError("Updated Password is not saved ", 500);
      return next(error);
    }

   
  
    res.status(200).json({
      message: "upload Successfully",
      user: user.toObject({ getters: true }),
    });
}
  

exports.paySalary = paySalary;
exports.createTeacher = createTeacher;
exports.updateProfile = updateProfile;
exports.updatePassword = updatePassword;
exports.getTeacher = getTeacher;
exports.applyExam = applyExam;
exports.uploadPhoto = uploadPhoto;
