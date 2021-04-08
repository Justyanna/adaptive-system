import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true
	})
);

export default app;
