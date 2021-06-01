import mongoose from 'mongoose';

const model = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
        unique: true
    },
    originalname: {
        type: String
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    }
});

const File = mongoose.model('File', model);
export default File;