import CourseList from './CourseList';
import RoleList from './RoleList';
import CoursePlot from './CoursePlot'

const UserCard = ({ user }) => {
	return (
		<li className="card">
			<p>{`${user.firstName} ${user.lastName}`}</p>
			<p>{user.email}</p>
			<RoleList user={user} />
      {console.log(user.xAxis)}
      <CoursePlot xAxis ={user.xAxis} yAxis ={user.yAxis}></CoursePlot>
			{/* <CourseList courses={user.courses} /> */}
			{/* <button className="btn error">Zablokuj</button> */}
		</li>
	);
};

export default UserCard;
