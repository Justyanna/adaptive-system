import express from 'express';
import coursesController from './coureses.controller.js';
import auth from '../../middleware/auth.js';

const coursesRouter = express.Router();

coursesRouter.get('/courses', coursesController.getCourses);
coursesRouter.post('/course', auth.authenticate, coursesController.addCourse);
coursesRouter.get('/course/:courseId', coursesController.getCourse);
coursesRouter.patch('/course/:courseId', auth.authenticate, coursesController.updateCourse);
coursesRouter.delete('/course/:courseId', auth.authenticate, coursesController.deleteCourse);
export default coursesRouter;