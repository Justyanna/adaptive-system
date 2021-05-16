import mongoose from 'mongoose';

const model = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    activities: {
        type: [new mongoose.Schema({})]
    }
});

const Course = mongoose.model('Course', model);
export default Course;