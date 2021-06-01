import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getUserList } from '../../services/users';
import UserList from './UserList';

const Admin = () => {
	const history = useHistory();
	const [ users, setUsers ] = useState([]);

	useEffect(
		() => {
			let mounted = true;
			getUserList()
				.then(({ data }) => {
					if (mounted) setUsers(data);
				})
				.catch((_) => {
					history.push('/');
				});
			return () => {
				mounted = false;
			};
		},
		[ history ]
	);

	return (
		<main className="layout">
			<h2>Użytkownicy</h2>
			<UserList users={users} />
		</main>
	);
};

export default Admin;
