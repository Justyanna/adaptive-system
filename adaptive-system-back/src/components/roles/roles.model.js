import mongoose from 'mongoose';

const model = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		trim: true
	}
});

const Role = mongoose.model('Role', model);
export default Role;
