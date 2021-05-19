import mongoose from 'mongoose';

const lesson = new mongoose.Schema({
    type: new mongoose.Schema({
        type: String,
        content: [
            [Object]
        ]
    }, { _id: false })
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
        type: [Object],
        required: false
    }
});

const Course = mongoose.model('Course', model);
export default Course;