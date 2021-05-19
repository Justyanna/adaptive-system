import { useState, useEffect } from 'react'
import { getUserList } from '../../services/users'
import UserList from './UserList'

const Admin = () => {
  const [users, setUsers] = useState([])

  useEffect(_ => {
    ;(async _ => {
      const res = await getUserList()
      setUsers(res.data)
      // console.log(res.data[1])
    })()
  }, [])

  return (
    <main className="layout">
      <h2>Użytkownicy</h2>
      <UserList users={users} />
    </main>
  )
}

export default Admin
