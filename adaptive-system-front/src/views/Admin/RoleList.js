import RoleItem from './RoleItem'

const Roleroles = ({ user }) => {
  return (
    <>
      <h4 style={{ margin: '1em 0 0.5em' }}>Role</h4>
      <ul className='list' style={{ marginBottom: '1em' }}>
        <RoleItem user={user} role='admin' key='0' />
        <RoleItem user={user} role='teacher' key='1' />
        <RoleItem user={user} role='student' key='2' />
      </ul>
    </>
  )
}

export default Roleroles
