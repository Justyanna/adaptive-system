import mongoose from 'mongoose';

const model = new mongoose.Schema({
	login: {
		type: String,
		required: true,
		unique: true,
		match: /^[a-zA-Z0-9\s]+$/,
		minlength: 2,
		maxlength: 20,
		trim: true
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
		trim: true
	},
	firstname: {
		type: String,
		required: true,
		match: /^[a-zA-Z\s]+$/,
		minlength: 2,
		maxlength: 20,
		trim: true
	},
	lastname: {
		type: String,
		required: true,
		match: /^[a-zA-Z\s]+$/,
		minlength: 2,
		maxlength: 20,
		trim: true
	},
	role: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Role'
	}
});

const User = mongoose.model('User', model);
export default User;
