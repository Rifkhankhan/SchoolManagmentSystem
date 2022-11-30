const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
	name: { type: String, required: true},
	genter: { type: String, required: true },
	address: { type: String, required: true },
	email: { type: String, required: true ,unique:true},
	password: { type: String, required: true },
	mobile: { type: String, required: true ,unique:true},
	dob: { type: String, required: true },
	image: { type: String,unique:true},
    studentId:{type:String,unique:true},
    grade:{type:String,required:true},
    courses:{type:Array},
    results:{type:Array}
});
userSchema.plugin(UniqueValidator); // to use unique value

module.exports = mongoose.model('Student', userSchema);
