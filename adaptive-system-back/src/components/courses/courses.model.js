import mongoose from 'mongoose';

const model = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	}
});

const Course = mongoose.model('Course', model);
export default Course;
