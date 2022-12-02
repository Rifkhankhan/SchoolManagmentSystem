const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UniqueValidator = require('mongoose-unique-validator');

const examSchema = new Schema({
	role: { type: String, required: true },
	money:{type:Number,required:true},
    rolename:{type:String,required:true},
	from:{type:String,required:true},
	date:{type:String,required:true},
});
examSchema.plugin(UniqueValidator); // to use unique value

module.exports = mongoose.model('Payment', examSchema);
