import styles from './Admin.module.css'

const RoleItem = ({ role, user }) => {
  return (
    <li className={styles['item']}>
      <input type="checkbox" name={role.name} id={`${user._id}-${role.name}`} />
      <span> {`${user.lastName} ${role.name}`}</span>
    </li>
  )
}

export default RoleItem
