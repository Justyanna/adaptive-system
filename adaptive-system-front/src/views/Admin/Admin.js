import { useState, useEffect } from 'react'
import { getUserList } from '../../services/users'
import UserList from './UserList'

const Admin = ({ setUser }) => {
  const [users, setUsers] = useState([])

  useEffect(_ => {
    ;(async _ => {
      const res = await getUserList()
      setUsers(res.data)
    })()
  }, [])

  return (
    <main className="layout">
      <h2>Użytkownicy</h2>
      <UserList users={users} setUser={setUser} />
    </main>
  )
}

export default Admin
