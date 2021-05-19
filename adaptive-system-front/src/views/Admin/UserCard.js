import CourseList from './CourseList'
import RoleList from './RoleList'

const UserCard = ({ user }) => {
  return (
    <li className="card">
      <p>{`${user.firstName} ${user.lastName}`}</p>
      <p>{user.email}</p>
      <RoleList user={user} roles={user.roles} />
      <CourseList courses={user.courses} />
      <button className="btn error">Zablokuj</button>
    </li>
  )
}

export default UserCard
