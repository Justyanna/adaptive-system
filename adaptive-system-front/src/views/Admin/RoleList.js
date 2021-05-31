import RoleItem from './RoleItem'

const Roleroles = ({ user }) => {
  return (
    <>
      <p>Role</p>
      <ul className='list'>
        <RoleItem user={user} role='admin' key='0' />
        <RoleItem user={user} role='teacher' key='1' />
        <RoleItem user={user} role='student' key='2' />
      </ul>
    </>
  )
}

export default Roleroles
