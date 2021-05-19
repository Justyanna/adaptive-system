import Course from './courses.model.js';
import auth from '../../middleware/auth.js';
import User from '../users/users.model.js';

const getCourses = async(req, res, next) => {
    try {
        let courses = await Course.find({}).select({
            name: 1,
            _id: 1,
            category: 1,
            author: 1,
            date: 1
        });

        for (let course of courses) {
            const user = await User.findOne({ _id: course.author }, { _id: 1, firstName: 1, lastName: 1 });
            course.author = user;
        }

        res.json(courses);
    } catch (ex) {
        next(ex);
    }
};

const getTeacherCourses = async(req, res, next) => {
    try {
        const isTeacher = await auth.checkUserRole(req.roles, 'teacher');
        if (isTeacher) {
            const user = await User.findOne({ login: req.login });
            let courses = await Course.find({ author: user._id }).select({
                name: 1,
                _id: 1,
                category: 1,
                author: 1,
                date: 1
            });

            for (let course of courses) {
                const user = await User.findOne({ _id: course.author }, { _id: 1, firstName: 1, lastName: 1 });
                course.author = user;
            }
            res.json(courses);
        } else {
            res.status(403);
            res.json({ message: 'User is not teacher' });
        }
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

export default { getCourses, getCourse, addCourse, deleteCourse, updateCourse, getTeacherCourses };