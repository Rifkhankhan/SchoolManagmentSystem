const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const Student = require("../models/Student");
const uuid = require('uuid');
const Course = require("../Models/Course");
const Exam = require("../Models/Exam");

const createStudent = async (req, res, next) => {

  const {name,grade,gender,age,mobile,address,email,dob}  = req.body;

	const newStudent = new Student({
		    name:name,
        gender:gender,
        address:address,
        email:email,
        age:age,
        password:'123456',
        mobile:mobile,
        dob:dob,
        active:true,
        grade:grade,
        studentId:uuid.v1(),
        image:''
	});
  
	try {
    await newStudent.save();
	} catch (err) {
    console.log(newStudent);
		const error = new HttpError('Creating newStudent failed,try again', 500);
		return next(error);
	}
	res.json({ newStudent: newStudent.toObject({ getters: true }) });
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
    user = await Student.findById(userId);
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

  const { email,name,gender,address,mobile,dob,id,image,age,courses,grade,parents } = req.body;

  let user;

  try {
    user = await Student.findById(userId);
  } catch (err) {
    const error = new HttpError("User is not there provided by the id", 500);
    return next(error);
  }


    user.email = email;
    user.name = name,
    user.address = address;
    user.dob = dob;
    user.gender = gender;
    user.age = age;
    user.mobile = mobile;
    user.courses = courses;
    user.grade = grade;
    user.parents = parents;

  try {
    console.log(user);
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

const getStudent = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
	}

	const {id} = req.params;

	let user;

	try {
		user = await Student.findById(id);
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

const getStudents = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
	}

	

	let users;

	try {
		users = await Student.find();
	} catch (err) {
		const error = new HttpError('finding user failed bt id,try again', 500);
		return next(error);
	}

	if (!users) {
		res.status(201).json({ message: 'There is no ususerser ' });
	} else {
    console.log(users);
		return res.status(201).json(users.toObject({ getters: true }));
	}
};


const applyCourse = async (req, res, next) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      throw new HttpError("Invalid inputs passed, please check your data.", 422);
    }
  
    const { courseId, money, userId } = req.body;
  
   
    let user;
    let course;
  
    try {
      user = await Student.findById(userId);
    } catch (err) {
      const error = new HttpError("User is not there provided by the id", 500);
      return next(error);
    }
    
    user.courses.push(courseId);
    
    try {
        course = await Course.findById(courseId);
    } catch (err) {
        const error = new HttpError("Course is not there provided by the id", 500);
        return next(error);
    }

    user.teachers.push(course.teachers)
    user.fees.push({
        date:Date.now().toString(),
        money:money,
        event:course.role,
        eventname:course.name
    });

    course.students.push(userId);

    try {
      await user.save();
    } catch (err) {
      const error = new HttpError("Updated Password is not saved ", 500);
      return next(error);
    }

    try {
        await course.save();
      } catch (err) {
        const error = new HttpError("Updated Password is not saved ", 500);
        return next(error);
      }
    
  
    res.status(200).json({
      message: "paid Successfully",
      user: user.toObject({ getters: true }),
      course:course.toObject({getters:true})
    });
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
      user = await Student.findById(userId);
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

  
    user.fees.push({
        date:Date.now().toString(),
        money:money,
        event:exam.role,
        eventname:exam.name
    });

    exam.students.push(userId);

    try {
      await user.save();
    } catch (err) {
      const error = new HttpError("Updated Password is not saved ", 500);
      return next(error);
    }

    try {
        await course.save();
      } catch (err) {
        const error = new HttpError("Updated Password is not saved ", 500);
        return next(error);
      }
    
  
    res.status(200).json({
      message: "paid Successfully",
      user: user.toObject({ getters: true }),
      exam:exam.toObject({getters:true})
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
      user = await Student.findById(userId);
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
  
  
exports.createStudent = createStudent;
exports.updateProfile = updateProfile;
exports.updatePassword = updatePassword;
exports.getStudent = getStudent;
exports.applyCourse = applyCourse;
exports.applyExam = applyExam;
exports.uploadPhoto = uploadPhoto;
exports.getStudents = getStudents;
