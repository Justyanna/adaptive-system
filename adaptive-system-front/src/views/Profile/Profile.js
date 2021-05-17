import React from 'react'
import styles from './Profile.module.css'

const Profile = ({ user }) => {
  let roleNames = {
    admin: 'Administrator',
    teacher: 'Prowadzący',
    student: 'Kursant',
  }

  return (
    <main className={styles['layout']}>
      <p
        className={styles['user-name']}
      >{`${user.firstName} ${user.lastName}`}</p>
      <ul className={styles['user-roles']}>
        {user.roles.map((role, key) => (
          <li className={styles['user-role']} key={key}>
            {roleNames[role]}
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Profile
