const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UniqueValidator = require('mongoose-unique-validator');

const examSchema = new Schema({
	name: { type: String, required: true },
	teachers: { type: Array, required: true },
	fees:{type:Number,required:true},
	place:{type:Array,required:true},
    classes:{type:Array,required:true},
	students:{type:Array},
	active:{type:Boolean,required:true},
	date:{type:String,required:true},
	role:{type:String,required:true}

});
examSchema.plugin(UniqueValidator); // to use unique value

module.exports = mongoose.model('Exam', examSchema);
