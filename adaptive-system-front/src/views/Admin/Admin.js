import { useState, useEffect } from 'react'
import UserCard from './UserCard'

const Admin = () => {
  let [userList, setUserList] = useState(null)

  useEffect(_ => {
    setUserList(getUserList())
  }, [])

  let getUserList = _ => {
    return [
      {
        _id: '123',
        firstName: 'Jan',
        lastName: 'Kowalski',
        email: 'jan@kowalski.test',
        courses: ['Kurs 1', 'Kurs 5'],
        roles: ['Admin', 'Student'],
      },
      {
        _id: '124',
        firstName: 'Janina',
        lastName: 'Kowalska',
        email: 'janina@kowalska.test',
        courses: ['Kurs 1', 'Kurs 2'],
        roles: ['Teacher', 'Student'],
      },
      {
        _id: '125',
        firstName: 'Adam',
        lastName: 'Adamowicz',
        email: 'adam@adamowicz.test',
        courses: [],
        roles: ['Student'],
      },
      {
        _id: '126',
        firstName: 'Eureka',
        lastName: 'Lando',
        email: 'eureka@lando.test',
        courses: [],
        roles: [],
      },
    ]
  }

  return (
    <main className="layout">
      <h2>Użytkownicy</h2>
      {userList === null ? (
        <p>Nie ma tu żadnych użytkowników</p>
      ) : (
        userList.map((user, key) => <UserCard user={user} key={key} />)
      )}
    </main>
  )
}

export default Admin
