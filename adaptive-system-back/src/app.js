import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './components/index.js';
import connect from './utils/dbconnection.js';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true
	})
);
app.use(router);

connect();
app.listen(port, () => console.log('\x1b[32m', `Server listening on port ${port}!`));
