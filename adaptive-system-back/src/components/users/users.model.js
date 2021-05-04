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
	email: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		required: true,
		match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address' ]
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
	courses: {
		type: [ mongoose.Schema.Types.ObjectId ],
		ref: 'Course',
		default: [],
		required: false
	},
	Xaxis: {
		type: Number,
		required: false
	},
	Yaxis: {
		type: Number,
		required: false
	},
	roles: {
		type: [ mongoose.Schema.Types.ObjectId ],
		required: true,
		ref: 'Role'
	}
});

const User = mongoose.model('User', model);
export default User;
