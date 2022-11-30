const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
	placeId: { type: String, required: true },
	name: { type: String, required: true },
	courses: { type: Array, required: true },
	image:{type:String,required:true,unique:true}
});
userSchema.plugin(UniqueValidator); // to use unique value

module.exports = mongoose.model('Place', userSchema);
