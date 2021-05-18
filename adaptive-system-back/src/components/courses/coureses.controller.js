import Course from './courses.model.js';
import auth from '../../middleware/auth.js';
import User from '../users/users.model.js';

const getCourses = async(req, res, next) => {
    try {
        const courses = await Course.find({}).select({
            name: 1,
            _id: 1,
            category: 1,
            author: 1,
            date: 1
        });
        res.json(courses);
    } catch (ex) {
        next(ex);
    }
};

const getCourse = async(req, res, next) => {
    try {
        const course = await Course.findById(req.params.courseId);
        res.json(course);
    } catch (ex) {
        next(ex);
    }
};

const addCourse = async(req, res, next) => {
    try {
        const isAdmin = await auth.checkIsAdmin(req.roles);
        if (isAdmin) {
            const newCourse = new Course(req.body);
            const newSavedCourse = await newCourse.save();
            res.json(newSavedCourse);
        } else {
            res.status(403);
            res.json({ message: 'Forbbiden access' });
        }
    } catch (ex) {
        next(ex);
    }
};

const deleteCourse = async(req, res, next) => {
    try {
        const isAdmin = await auth.checkIsAdmin(req.roles);
        if (isAdmin) {
            await Course.findByIdAndDelete(req.params.courseId);
            res.json({ message: 'Course deleted successfully' });
        } else {
            res.status(403);
            res.json({ message: 'Forbbiden access' });
        }
    } catch (ex) {
        next(ex);
    }
};

const updateCourse = async(req, res, next) => {
    try {
        const isAdmin = await auth.checkIsAdmin(req.roles);
        if (isAdmin) {
            const updatedCourse = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
            res.json(updatedCourse);
        } else {
            res.status(403);
            res.json({ message: 'Forbbiden access' });
        }
    } catch (ex) {
        next(ex);
    }
};

export default { getCourses, getCourse, addCourse, deleteCourse, updateCourse };