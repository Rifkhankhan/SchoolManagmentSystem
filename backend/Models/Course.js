const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UniqueValidator = require('mongoose-unique-validator');

const courseSchema = new Schema({
	courseCode: { type: String, required: true,unique:true },
	name: { type: String, required: true },
	teachers: { type: Array, required: true },
	fees:{type:Number,required:true},
	place:{type:Array,required:true},
    classes:{type:Array,required:true},
	students:{type:Array},
	active:{type:Boolean,required:true},
	duration:{type:String,required:true},
	role:{type:String,required:true}
});
courseSchema.plugin(UniqueValidator); // to use unique value

module.exports = mongoose.model('Course', courseSchema);
