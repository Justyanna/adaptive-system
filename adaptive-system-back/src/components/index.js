import express from 'express';
import usersRouter from './users/users.router.js';

const main = express.Router();
const componentRouters = [ usersRouter ];

main.use(componentRouters);

export { main as router };
