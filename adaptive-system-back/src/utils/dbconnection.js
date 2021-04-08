import mongoose from 'mongoose';
import initializeDb from './dbinit.js';

const connect = () => {
	mongoose
		.connect(process.env.CONNECTION_STRING, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true
		})
		.then(() => {
			initializeDb();
			console.log('\x1b[35m', 'Connected to database');
		});
};

export default connect;
