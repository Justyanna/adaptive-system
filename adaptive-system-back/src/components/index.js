import express from 'express';
import usersRouter from './users/users.router.js';
import courseRoter from './courses/courses.router.js';
import filesRouter from './files/files.router.js';

const main = express.Router();
const componentRouters = [usersRouter, courseRoter, filesRouter];

main.use(componentRouters);

export { main as router };