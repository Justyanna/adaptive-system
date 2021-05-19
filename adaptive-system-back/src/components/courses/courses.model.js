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
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    category: {
        type: String,
        required: true
    },
    activities: {
        type: new mongoose.Schema({
            common: [
                new mongoose.Schema({
                    texts: []
                }, { _id: false })
            ]
        }, { _id: false })
    }
});

const Course = mongoose.model('Course', model);
export default Course;