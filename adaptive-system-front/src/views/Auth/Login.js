import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { signIn } from '../../services/auth'
import { handleHttpError } from '../../services/httpUtils'
import { handleIssues } from '../../services/formUtils'

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

    return handleIssues(document, issues)
  }

  const [login, setLogin] = useState(null)
  const [password, setPassword] = useState(null)

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h2>Zaloguj się</h2>
        <div className="input">
          <label htmlFor="login">Login</label>
          <input
            type="text"
            name="login"
            id="login"
            onChange={e => setLogin(e.target.value)}
          />
          <small className="collapsed" id="err-login"></small>
        </div>
        <div className="input">
          <label htmlFor="password">Hasło</label>
          <input
            type="text"
            name="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
          />
          <small className="collapsed" id="err-password"></small>
        </div>
        <button className="btn">Zaloguj</button>
      </form>
      <Link to="/">Strona główna</Link>
    </main>
  )
}

export default Login
