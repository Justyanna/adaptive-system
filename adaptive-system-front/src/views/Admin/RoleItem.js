import styles from './Admin.module.css'

const RoleItem = ({ role, user }) => {
  return (
    <li className={styles['item']}>
      <input type="checkbox" name={role} id={`${user._id}-${role}`} />
      <span> {`${user.lastName} ${role}`}</span>
    </li>
  )
}

export default RoleItem
