const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
	courseCode: { type: String, required: true },
	name: { type: String, required: true },
	teachers: { type: Array, required: true },
	fees:{type:Number,required:true},
	place:{type:Array,required:true}
});
userSchema.plugin(UniqueValidator); // to use unique value

module.exports = mongoose.model('Course', userSchema);
