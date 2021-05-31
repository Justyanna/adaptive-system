import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getUserList } from '../../services/users'
import UserList from './UserList'

const Admin = () => {
  const history = useHistory()
  const [users, setUsers] = useState([])

  useEffect(
    _ => {
      getUserList()
        .then(({ data }) => {
          setUsers(data)
        })
        .catch(_ => {
          history.push('/')
        })
    },
    [history]
  )

  return (
    <main className='layout'>
      <h2>Użytkownicy</h2>
      <UserList users={users} />
    </main>
  )
}

export default Admin
