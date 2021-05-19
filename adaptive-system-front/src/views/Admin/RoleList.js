import RoleItem from './RoleItem'

const Roleroles = ({ roles, user, setUser }) => {
  if (!roles?.length > 0) return <></>
  return (
    <>
      <p>Role</p>
      <ul className="list">
        <RoleItem user={user} role="admin" setUser={setUser} key="0" />
        <RoleItem user={user} role="teacher" setUser={setUser} key="1" />
        <RoleItem user={user} role="student" setUser={setUser} key="2" />
      </ul>
    </>
  )
}

export default Roleroles
