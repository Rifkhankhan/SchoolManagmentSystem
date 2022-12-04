const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
	name: { type: String, required: true},
	genter: { type: String, required: true },
	address: { type: String, required: true },
	email: { type: String, required: true ,unique:true},
	age: { type: Number, required: true },
	password: { type: String, required: true },
	mobile: { type: String, required: true ,unique:true},
	dob: { type: String, required: true },
	image: { type: String},
    teacherId:{type:String},
    classes:{type:Array},
    courses:{type:Array},
	exams:{type:Array},
	active:{type:Boolean,required:true},
	salary:[{date:Date,money:Number}],
	students:{type:Array}
});
// userSchema.plugin(UniqueValidator); // to use unique value

module.exports = mongoose.model('Teacher', userSchema);
