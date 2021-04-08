import express from 'express';
import usersController from './users.controller.js';
import { auth } from '../../middleware/auth.js';

const usersRouter = express.Router();

usersRouter.get('/user/:userId', auth, usersController.getUser);
usersRouter.post('/user', auth, usersController.addUser);
usersRouter.delete('/user/:userId', auth, usersController.deleteUser);

usersRouter.post('/user/auth/login', usersController.authUser);
usersRouter.post('/user/auth/verify', usersController.verifyUserToken);
