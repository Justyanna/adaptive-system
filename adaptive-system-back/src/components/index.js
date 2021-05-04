import express from 'express';
import usersRouter from './users/users.router.js';
import courseRoter from './courses/courses.router.js';

const main = express.Router();
const componentRouters = [ usersRouter, courseRoter ];

main.use(componentRouters);

export { main as router };
