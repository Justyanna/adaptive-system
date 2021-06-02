import { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Modal from '../../components/Modal/Modal'
import RoleList from './RoleList'
import { handleIssues } from '../../services/formUtils'
import { UserContext } from '../../contexts/UserContext'
import { updateUser } from '../../services/users'
import { updateToken, updateUserData } from '../../services/auth'

const errMessages = {
  confirmPassword: 'Hasła muszą być identyczne'
}

const Profile = () => {
  const history = useHistory()
  const [modal, showModal] = useState(false)
  const { user, setUser } = useContext(UserContext)

  const [firstName, setFirstName] = useState(user?.firstName || '')
  const [lastName, setLastName] = useState(user?.lastName || '')
  const [email, setEmail] = useState(user?.email || '')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')

  if (!user) {
    history.push('/')
    return <></>
  }

  const userDataChanged = _ =>
    firstName !== user.firstName ||
    lastName !== user.lastName ||
    email !== user.email

  const pswDataChanged = _ =>
    newPassword.length > 0 && confirmPassword.length > 0

  const dataChanged = _ => userDataChanged() || pswDataChanged()

  const prepareChanges = e => {
    e.preventDefault()
    const issues = []

    if (newPassword !== confirmPassword)
      issues.push({
        source: 'confirm-password',
        message: errMessages.confirmPassword
      })

    handleIssues(document, issues, 'form-input-error') && showModal(true)
  }

  const applyChanges = async e => {
    const newUser = newPassword
      ? {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: newPassword,
          oldPassword: oldPassword
        }
      : {
          firstName: firstName,
          lastName: lastName,
          email: email,
          oldPassword: oldPassword
        }
    const resp = updateUser(newUser)
    updateUserData(await updateToken(), setUser)
    setFirstName(resp.firstName)
    setLastName(resp.lastName)
    setEmail(resp.email)
    showModal(false)
    setNewPassword('')
    setConfirmPassword('')
    setOldPassword('')
  }

  return (
    <>
      <form className='layout form flow'>
        <h1>Profil</h1>
        <h2>Dane osobowe</h2>
        <div className='form-item'>
          <label className='form-label' htmlFor='first-name'>
            Imię
          </label>
          <input
            type='text'
            className='form-input form-input-wide'
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
            className='form-input form-input-wide'
            name='last-name'
            id='last-name'
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </div>
        <h2>Role</h2>
        {!user.roles.includes('student') && (
          <p>
            <Link className='link' to='/questionnaire'>
              Wypełnij ankietę
            </Link>
             aby móc zapisywać się na kursy.
          </p>
        )}
        <RoleList roles={user.roles} />
        <h2>Dane kontaktowe</h2>
        <div className='form-item'>
          <label className='form-label' htmlFor='email'>
            Adres email
          </label>
          <input
            type='text'
            className='form-input form-input-wide'
            name='email'
            id='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <h2>Zmień hasło</h2>
        <div className='form-item'>
          <label className='form-label' htmlFor='new-password'>
            Nowe hasło
          </label>
          <input
            type='password'
            className='form-input form-input-wide'
            name='new-password'
            id='new-password'
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
        </div>
        <div className='form-item'>
          <label className='form-label' htmlFor='new-password'>
            Potwierdź hasło
          </label>
          <input
            type='password'
            className='form-input form-input-wide'
            name='confirm-password'
            id='confirm-password'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <small
            className={'form-error collapsed'}
            id='err-confirm-password'
          ></small>
        </div>
        {dataChanged() && (
          <div className='form-item'>
            <button className='btn btn-wide' onClick={prepareChanges}>
              Zapisz zmiany
            </button>
          </div>
        )}
      </form>
      <Modal visible={modal} setVisible={showModal}>
        <h2>Zatwierdzenie zmian</h2>
        <div className='form-item'>
          <label className='form-label' htmlFor='new-password'>
            Wprowadź obecne hasło
          </label>
          <input
            type='password'
            className='form-input'
            name='old-password'
            id='old-password'
            onChange={e => setOldPassword(e.target.value)}
          />
        </div>
        <div className='form-item'>
          <button className='btn' onClick={applyChanges}>
            Zatwierdź zmiany
          </button>
        </div>
      </Modal>
    </>
  )
}

export default Profile
