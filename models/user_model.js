const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true },
	teamName: {type: String, required: true, unique: true},
	resetPasswordToken: {type: String},
	resetPasswordExpires: {type: Date},
})

const User = mongoose.model('User', userSchema);

module.exports = User;