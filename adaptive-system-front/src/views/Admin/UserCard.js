import RoleList from './RoleList'
import CoursePlot from './CoursePlot'

const UserCard = ({ user }) => {
  return (
    <li className='card' style={{ display: 'flex', flexDirection: 'column' }}>
      <h3>{`${user.firstName} ${user.lastName}`}</h3>
      <p style={{ fontStyle: 'italic' }}>{user.email}</p>
      <RoleList user={user} />
      <CoursePlot xAxis={user.xAxis} yAxis={user.yAxis}></CoursePlot>
      {/* <CourseList courses={user.courses} /> */}
      {/* <button className="btn error">Zablokuj</button> */}
    </li>
  )
}

export default UserCard
