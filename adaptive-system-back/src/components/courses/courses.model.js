import mongoose from 'mongoose';

const question = new mongoose.Schema({
    question: String,
    answers: [String],
    correct: [Number]
}, { _id: false });

const test = new mongoose.Schema({
    title: { type: String, unique: true },
    desc: String,
    questions: [question]
}, { _id: false });

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
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    category: {
        type: String,
        required: true
    },
    lessons: {
        type: Array(Object),
        default: [],
        required: false
    },
    tests: {
        type: [test]
    }
});

const Course = mongoose.model('Course', model);
export default Course;