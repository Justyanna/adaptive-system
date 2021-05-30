import styles from './Profile.module.css'

const RoleList = ({ roles }) => {
  const roleNames = {
    admin: 'Administrator',
    teacher: 'Prowadzący',
    student: 'Kursant'
  }

  return (
    <ul className={styles['user-roles']}>
      {roles.map((role, key) => (
        <li className={styles['user-role']} key={key}>
          {roleNames[role]}
        </li>
      ))}
    </ul>
  )
}

export default RoleList
