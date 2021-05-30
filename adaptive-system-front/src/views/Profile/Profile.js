import { useState } from 'react'
import styles from './Profile.module.css'
import RoleList from './RoleList'

const Profile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [email, setEmail] = useState(user.email)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const userDataChanged = _ =>
    firstName !== user.firstName ||
    lastName !== user.lastName ||
    email !== user.email

  const pswDataChanged = _ => oldPassword.length > 0 && newPassword.length > 0

  return (
    <form className='layout form flow'>
      <h1>Profil</h1>
      <h2>Dane osobowe</h2>
      <div className='form-item'>
        <label className='form-label' htmlFor='first-name'>
          Imię
        </label>
        <input
          type='text'
          className='form-input'
          name='first-name'
          id='first-name'
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
      </div>
      <div className='form-item'>
        <label className='form-label' htmlFor='last-name'>
          Nazwisko
        </label>
        <input
          type='text'
          className='form-input'
          name='last-name'
          id='last-name'
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
      </div>
      <h2>Role</h2>
      <RoleList roles={user.roles} />
      <h2>Dane kontaktowe</h2>
      <div className='form-item'>
        <label className='form-label' htmlFor='email'>
          Adres email
        </label>
        <input
          type='text'
          className='form-input'
          name='email'
          id='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className='form-item'>
        {userDataChanged() && <button class='btn btn-wide'>Zapisz</button>}
      </div>
      <h2>Zmień hasło</h2>
      <div className='form-item'>
        <label className='form-label' htmlFor='old-password'>
          Obecne hasło
        </label>
        <input
          type='password'
          className='form-input'
          name='old-password'
          id='old-password'
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
        />
      </div>
      <div className='form-item'>
        <label className='form-label' htmlFor='new-password'>
          Nowe hasło
        </label>
        <input
          type='password'
          className='form-input'
          name='new-password'
          id='new-password'
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
        />
      </div>
      <div className='form-item'>
        {pswDataChanged() && <button class='btn btn-wide'>Zmień</button>}
      </div>
    </form>
  )
}

export default Profile
