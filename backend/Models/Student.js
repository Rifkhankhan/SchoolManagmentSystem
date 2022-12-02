const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
	name: { type: String, required: true },
	gender: { type: String, required: true },
	address: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	age: { type: Number, required: true },
	password: { type: String, required: true },
	mobile: { type: String, required: true },
	dob: { type: String, required: true },
	active: { type: Boolean, required: true },
	grade: { type: String, required: true },
	studentId: { type: String, unique: true, required: true },
	image: { type: String},

	courses: { type: Array },
	exams: { type: Array },
	fees: [{ date: Date, money: Number, event: String, eventname: String }],
	teachers: { type: Array },
	parents: { type: Array }
});
userSchema.plugin(UniqueValidator); 

module.exports = mongoose.model('Student', userSchema);
