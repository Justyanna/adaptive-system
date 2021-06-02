import mongoose from 'mongoose';

const model = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        maxlength: 20,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
        trim: true
    },
    courses: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Course',
        default: [],
        required: false
    },
    xAxis: {
        type: Number,
        required: false
    },
    yAxis: {
        type: Number,
        required: false
    },
    roles: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'Role'
    },
    questionnaire: {
        type: new mongoose.Schema({
            active: Number,
            questions: [
                new mongoose.Schema({
                    id: String,
                    val: String
                }, { _id: false })
            ]
        }, { _id: false }),
        required: false
    }
});

const User = mongoose.model('User', model);
export default User;