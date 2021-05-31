import { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { signIn, updateUserData } from '../../services/auth'
import { handleHttpError } from '../../services/httpUtils'
import { handleIssues } from '../../services/formUtils'
import styles from './Auth.module.css'
import { UserContext } from '../../contexts/UserContext'

const Login = () => {
  const history = useHistory()

  const { user, setUser } = useContext(UserContext)

  const [login, setLogin] = useState(null)
  const [password, setPassword] = useState(null)

  if (user) {
    history.push('/profile')
    return <></>
  }

  const removeHighlight = _ => {
    document
      .querySelector(`.${styles['form']}`)
      .classList.remove(styles['form-invalid'])
    document.querySelector('#err-form').classList.add('collapsed')
    document
      .querySelectorAll(`.${styles['form-input']}`)
      .forEach(input => input.removeEventListener('focus', removeHighlight))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!validateForm()) return
    try {
      const res = await signIn({ login, password })
      updateUserData(res, setUser)
      history.push('/')
    } catch (err) {
      handleHttpError(err, {
        handle4xx: _ => {
          document
            .querySelector(`.${styles['form']}`)
            .classList.add(styles['form-invalid'])
          document.querySelector('#err-form').classList.remove('collapsed')
          document
            .querySelectorAll(`.${styles['form-input']}`)
            .forEach(input => input.addEventListener('focus', removeHighlight))
        },
        handle5xx: err => {
          console.log(`Błąd serwera: ${err.statusText}`)
        }
      })
    }
  }

  const validateForm = () => {
    const issues = []

    if (!(login?.length > 0))
      issues.push({ source: 'login', message: 'Pole login nie może być puste' })

    if (!(password?.length > 0))
      issues.push({
        source: 'password',
        message: 'Pole hasło nie może być puste'
      })

    return handleIssues(document, issues, 'form-input-error')
  }

  return (
    <main className='layout'>
      <form
        className={`${styles['form']} flow`}
        style={{ width: '300px' }}
        onSubmit={handleSubmit}
      >
        <h2>Logowanie</h2>
        <div className='form-item'>
          <label className='form-label' htmlFor='login'>
            Login
          </label>
          <input
            className={styles['form-input']}
            type='text'
            name='login'
            id='login'
            onChange={e => setLogin(e.target.value)}
          />
          <small className='form-error collapsed' id='err-login'>
            Należy wprowadzić login
          </small>
        </div>
        <div className='form-item'>
          <label className='form-label' htmlFor='password'>
            Hasło
          </label>
          <input
            className={styles['form-input']}
            type='password'
            name='password'
            id='password'
            onChange={e => setPassword(e.target.value)}
          />
          <small className='form-error collapsed' id='err-password'>
            Należy wprowadzić hasło
          </small>
        </div>
        <div className='form-item collapsed' id='err-form'>
          <small className='form-error'>Nieprawidłowy login lub hasło</small>
        </div>
        <div className='form-item'>
          <button className={`btn ${styles['form-submit']}`}>Zaloguj</button>
        </div>
      </form>
      <Link className='link' to='/'>
        Strona główna
      </Link>
    </main>
  )
}

export default Login
