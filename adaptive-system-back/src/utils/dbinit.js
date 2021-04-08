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

export default initializeDb;
