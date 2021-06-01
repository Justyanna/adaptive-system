import express from 'express';
import coursesController from './courses.controller.js';
import auth from '../../middleware/auth.js';

const coursesRouter = express.Router();
coursesRouter.get('/teacher/courses', auth.authenticate, coursesController.getTeacherCourses);
coursesRouter.get('/categories', auth.authenticate, coursesController.getCatgories);
coursesRouter.get('/courses', coursesController.getCourses);
coursesRouter.post('/course', auth.authenticate, coursesController.addCourse);
coursesRouter.get('/course/:courseId', coursesController.getCourse);
coursesRouter.put('/course/:courseId', auth.authenticate, coursesController.updateCourse);
coursesRouter.delete('/course/:courseId', auth.authenticate, coursesController.deleteCourse);
export default coursesRouter;