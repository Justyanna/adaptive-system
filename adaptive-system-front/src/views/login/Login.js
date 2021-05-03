import { useState } from 'react'
import { signIn } from '../../services/auth'

const Login = () =>
{
    const handleSubmit = async e =>
    {
        e.preventDefault()
        const res = await signIn({login, password})
        console.log(res)
    }

    const [login, setLogin] = useState(null)
    const [password, setPassword] = useState(null)

    return (
        <form onSubmit={handleSubmit}>
            <h2>Zaloguj się</h2>
            <div className="input">
                <label htmlFor="login">Login</label>
                <input type="text" name="login" id="login" onChange={e => setLogin(e.target.value)} />
            </div>
            <div className="input">
                <label htmlFor="password">Password</label>
                <input type="text" name="password" id="password" onChange={e => setPassword(e.target.value)} />
            </div>
            <button className="btn">Zaloguj</button>
        </form>
    )
}

export default Login
