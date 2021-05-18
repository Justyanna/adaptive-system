import express from 'express';
import usersController from './users.controller.js';
import auth from '../../middleware/auth.js';

const usersRouter = express.Router();

usersRouter.get('/user/:userId', auth.authenticate, usersController.getUser);
usersRouter.get('/users', auth.authenticate, usersController.getUsers);
usersRouter.get('/update', auth.authenticate, usersController.updateToken);
// usersRouter.get('/users/roleId', auth.authenticate, usersController.getUserByRole);
usersRouter.get('/users/courses', auth.authenticate, usersController.getCourses);

usersRouter.post('/user', usersController.addUser);
usersRouter.post('/user/login', usersController.authUser);
usersRouter.post('/user/verify', usersController.verifyUserToken);
usersRouter.post('/user/enroll', auth.authenticate, usersController.enrollUserForCourse);

usersRouter.post('/questionnaire', auth.authenticate, usersController.checkQuestionnaire);
usersRouter.get('/questionnaire', auth.authenticate, usersController.getQuestionnaire);

usersRouter.delete('/user/:userId', auth.authenticate, usersController.deleteUser);

export default usersRouter;