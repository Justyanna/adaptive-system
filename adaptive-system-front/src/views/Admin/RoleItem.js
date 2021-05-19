import styles from './Admin.module.css'
import { toggleUserRole } from '../../services/users'
import {
  getUserDetails,
  updateToken,
  updateUserData,
} from '../../services/auth'

const RoleItem = ({ user, role, setUser }) => {
  const roleNames = {
    admin: 'Administrator',
    teacher: 'Prowadzący',
    student: 'Kursant',
  }

  const toggleRole = async _ => {
    let res = await toggleUserRole({ userId: user._id, role: role })
    if (res.data.user._id === getUserDetails()._id)
      updateUserData(await updateToken(), setUser)
  }

  return (
    <li className={styles['item']}>
      <input
        type="checkbox"
        name={role}
        id={`${user._id}-${role}`}
        defaultChecked={user.roles.some(r => r.name === role)}
        disabled={
          role === 'student' ||
          (role === 'admin' && user._id === getUserDetails()._id)
        }
        onChange={toggleRole}
      />
      <span> {roleNames[role]}</span>
    </li>
  )
}

export default RoleItem
