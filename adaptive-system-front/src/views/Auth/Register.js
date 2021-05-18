import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { signUp } from '../../services/auth'
import { handleHttpError } from '../../services/httpUtils'
import {
  regexEmail,
  regexName,
  errMessages,
  regexLogin,
  handleIssues,
} from '../../services/formUtils'
import styles from './Auth.module.css'

const Register = ({ setUser }) => {
  let history = useHistory()

  const handleSubmit = async e => {
    e.preventDefault()
    if (!validateForm()) return
    try {
      const res = await signUp({ email, firstName, lastName, login, password })
      localStorage.setItem('eDukatorToken', res.data.token)
      localStorage.setItem('eDukatorUser', JSON.stringify(res.data.user))
      setUser(res.data.user)
      history.push('/')
    } catch (err) {
      handleHttpError(err, {
        handle5xx: err => {
          console.log(`Błąd serwera: ${err.statusText}`)
        },
      })
    }
  }

  const checkPassword = value => {
    console.log(password === confirmPassword)
  }

  const validateForm = () => {
    const issues = []

    if (!regexEmail.test(email ?? ''))
      issues.push({ source: 'email', message: errMessages.email })

    if (!regexName.test(firstName ?? ''))
      issues.push({ source: 'first-name', message: errMessages.firstName })

    if (!regexName.test(lastName ?? ''))
      issues.push({ source: 'last-name', message: errMessages.lastName })

    if (!regexLogin.test(login ?? ''))
      issues.push({ source: 'login', message: errMessages.login })

    const len = password?.length ?? 0

    if (len < 8 || len > 64)
      issues.push({ source: 'password', message: errMessages.password })

    if (password !== confirmPassword)
      issues.push({
        source: 'confirm-password',
        message: errMessages.confirmPassword,
      })

    return handleIssues(document, issues, styles['form-input-error'])
  }

  const [email, setEmail] = useState(null)
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [login, setLogin] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)

  return (
    <main className="layout">
      <form
        className={styles['form']}
        style={{ width: '400px' }}
        onSubmit={handleSubmit}
      >
        <h2>Rejestracja</h2>
        <div className={styles['form-item']}>
          <label className={styles['form-label']} htmlFor="email">
            Adres email
          </label>
          <input
            className={styles['form-input']}
            type="text"
            name="email"
            id="email"
            onChange={e => setEmail(e.target.value)}
          />
          <small
            className={`collapsed ${styles['form-error']}`}
            id="err-email"
          ></small>
        </div>
        <div className={styles['form-item']}>
          <label className={styles['form-label']} htmlFor="first-name">
            Imię
          </label>
          <input
            className={styles['form-input']}
            type="text"
            name="first-name"
            id="first-name"
            onChange={e => setFirstName(e.target.value)}
          />
          <small
            className={`collapsed ${styles['form-error']}`}
            id="err-first-name"
          ></small>
        </div>
        <div className={styles['form-item']}>
          <label className={styles['form-label']} htmlFor="last-name">
            Nazwisko
          </label>
          <input
            className={styles['form-input']}
            type="text"
            name="last-name"
            id="last-name"
            onChange={e => setLastName(e.target.value)}
          />
          <small
            className={`collapsed ${styles['form-error']}`}
            id="err-last-name"
          ></small>
        </div>
        <div className={styles['form-item']}>
          <label className={styles['form-label']} htmlFor="login">
            Login
          </label>
          <input
            className={styles['form-input']}
            type="text"
            name="login"
            id="login"
            onChange={e => setLogin(e.target.value)}
          />
          <small
            className={`collapsed ${styles['form-error']}`}
            id="err-login"
          ></small>
        </div>
        <div className={styles['form-item']}>
          <label className={styles['form-label']} htmlFor="password">
            Hasło
          </label>
          <input
            className={styles['form-input']}
            type="password"
            name="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
          />
          <small
            className={`collapsed ${styles['form-error']}`}
            id="err-password"
          ></small>
        </div>
        <div className={styles['form-item']}>
          <label className={styles['form-label']} htmlFor="confirm-password">
            Potwierdź hasło
          </label>
          <input
            className={styles['form-input']}
            type="password"
            name="confirm-password"
            id="confirm-password"
            onChange={e => setConfirmPassword(e.target.value)}
            onBlur={e => checkPassword()}
          />
          <small
            className={`collapsed ${styles['form-error']}`}
            id="err-confirm-password"
          ></small>
        </div>
        <div className={styles['form-item']}>
          <button className={`btn ${styles['form-submit']}`}>
            Zarejestruj
          </button>
        </div>
      </form>
      <Link to="/">Strona główna</Link>
    </main>
  )
}

export default Register
