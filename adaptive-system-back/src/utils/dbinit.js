import Role from '../components/roles/roles.model.js';

const initializeDb = () => {
	const roles = [ 'admin', 'teacher', 'student' ];
	try {
		roles.forEach((role) => {
			new Role({ name: role }).save();
		});
		console.log('Data base initialized with roles: ', roles);
	} catch (error) {}
};

export default initializeDb;
