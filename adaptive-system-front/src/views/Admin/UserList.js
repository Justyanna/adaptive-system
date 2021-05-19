import UserCard from './UserCard'

const UserList = ({ users }) => {
  if (!users?.length > 0) return <p>Nie ma tu żadnych użytkowników</p>
  return (
    <ul className="list">
      {users.map((user, key) => (
        <UserCard user={user} key={key} />
      ))}
    </ul>
  )
}

export default UserList
