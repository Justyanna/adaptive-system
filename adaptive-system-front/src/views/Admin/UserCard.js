import React from 'react'
import styles from './Admin.module.css'

const UserCard = ({ user }) => {
  return (
    <div className="card">
      <p>{`${user.firstName} ${user.lastName}`}</p>
      <p>{user.email}</p>
      {user.roles.length > 0 && (
        <React.Fragment>
          <p>Role</p>
          <ul>
            {user.roles.map((role, key) => (
              <li className={styles['item']} key={key}>
                {role}
              </li>
            ))}
          </ul>
        </React.Fragment>
      )}
      {user.courses.length > 0 && (
        <React.Fragment>
          <p>Kursy</p>
          <ul>
            {user.courses.map((course, key) => (
              <li className={styles['item']} key={key}>
                {course}
              </li>
            ))}
          </ul>
        </React.Fragment>
      )}
      <button className="btn">Admin</button>
      <button className="btn">Nauczyciel</button>
      <button className="btn">Zablokuj</button>
    </div>
  )
}

export default UserCard
