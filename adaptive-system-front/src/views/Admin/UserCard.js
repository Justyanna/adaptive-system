import CourseList from './CourseList'
import RoleList from './RoleList'

const UserCard = ({ user, setUser }) => {
  return (
    <li className="card">
      <p>{`${user.firstName} ${user.lastName}`}</p>
      <p>{user.email}</p>
      <p>Role</p>
      <RoleList user={user} setUser={setUser} />
      <p>Kursy</p>
      <CourseList courses={user.courses} />
      {/* <button className="btn error">Zablokuj</button> */}
    </li>
  )
}

export default UserCard
