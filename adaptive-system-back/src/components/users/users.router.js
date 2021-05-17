import express from 'express';
import usersController from './users.controller.js';
import auth from '../../middleware/auth.js';

const usersRouter = express.Router();

usersRouter.get('/user/:userId', auth.authenticate, usersController.getUser);
usersRouter.delete('/user/:userId', auth.authenticate, usersController.deleteUser);
usersRouter.post('/user', usersController.addUser);

usersRouter.post('/user/login', usersController.authUser);
usersRouter.post('/user/verify', usersController.verifyUserToken);
usersRouter.post('/user/enroll', auth.authenticate, usersController.enrollUserForCourse);
usersRouter.get('/update', auth.authenticate, usersController.updateToken);
usersRouter.post('/questionnaire', auth.authenticate, usersController.checkQuestionnaire);
usersRouter.get('/questionnaire', auth.authenticate, usersController.getQuestionnaire);

export default usersRouter;