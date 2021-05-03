import mongoose from 'mongoose';
import Role from '../components/roles/roles.model.js';

const initializeDb = () => {
	var counter = 0;
	const roles = [ 'admin', 'teacher', 'student' ];

	roles.forEach((role) => {
		Role.find({ name: role }).then((resp) => {
			if (!resp.name)
				new Role({ name: role })
					.save()
					.then(() => {
						counter++;
						if (counter == roles.length) console.log(' Database initialized with roles: ', roles);
					})
					.catch(() => null);
		});
	});
};

const connectDb = () => {
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

export default connectDb;
