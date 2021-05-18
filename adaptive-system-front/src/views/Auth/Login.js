import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { signIn } from '../../services/auth'
import { handleHttpError } from '../../services/httpUtils'
import { handleIssues } from '../../services/formUtils'
import styles from './Auth.module.css'

const Login = ({ setUser }) => {
  const history = useHistory()

  const handleSubmit = async e => {
    e.preventDefault()
    if (!validateForm()) return
    try {
      const res = await signIn({ login, password })
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

  const validateForm = () => {
    const issues = []

    if ((login?.length ?? 0) === 0)
      issues.push({ source: 'login', message: 'Pole login nie może być puste' })

    if ((password?.length ?? 0) === 0)
      issues.push({
        source: 'password',
        message: 'Pole hasło nie może być puste',
      })

    return handleIssues(document, issues, styles['form-input-error'])
  }

  const [login, setLogin] = useState(null)
  const [password, setPassword] = useState(null)

  return (
    <main className="layout">
      <form
        className={styles['form']}
        style={{ width: '300px' }}
        onSubmit={handleSubmit}
      >
        <h2>Logowanie</h2>
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
          <button className={`btn ${styles['form-submit']}`}>Zaloguj</button>
        </div>
      </form>
      <Link to="/">Strona główna</Link>
    </main>
  )
}

export default Login
