import RoleItem from './RoleItem'

const Roleroles = ({ roles, user }) => {
  if (!roles?.length > 0) return <></>
  return (
    <>
      <p>Role</p>
      <ul>
        {roles.map((role, key) => (
          <RoleItem user={user} role={role} key={key} />
        ))}
      </ul>
    </>
  )
}

export default Roleroles
