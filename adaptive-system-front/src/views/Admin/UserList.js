import UserCard from './UserCard'

const UserList = ({ users, setUser }) => {
  if (!users?.length > 0) return <p>Nie ma tu żadnych użytkowników</p>
  return (
    <ul className="list">
      {users.map((user, key) => (
        <UserCard user={user} setUser={setUser} key={key} />
      ))}
    </ul>
  )
}

export default UserList
