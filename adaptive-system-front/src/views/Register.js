import { useState } from 'react'
import { Link } from 'react-router-dom'
import { signUp } from '../services/auth'
import { handleHttpError } from '../services/httpUtils'
import { regexEmail, regexName, errMessages, regexLogin, handleIssues } from '../services/formUtils'

const Register = () =>
{
    const handleSubmit = async e =>
    {
        e.preventDefault()
        if(!validateForm()) return
        try
        {
            const res = await signUp({email, firstName, lastName, login, password})
            console.log(res)
        }
        catch(err)
        {
            handleHttpError(err, {
                handle5xx: err => { console.log(`Błąd serwera: ${err.statusText}`) }
            })
        }
    }

    const checkPassword = (value) =>
    {
        console.log(password === confirmPassword)
    }

    const validateForm = () =>
    {
        const issues = []

        if(!regexEmail.test(email ?? ""))
            issues.push({source: 'email', message: errMessages.email})
        
        if(!regexName.test(firstName ?? ""))
            issues.push({source: 'first-name', message: errMessages.firstName })
        
        if(!regexName.test(lastName ?? ""))
            issues.push({source: 'last-name', message: errMessages.lastName })
    
        if(!regexLogin.test(login ?? ""))
            issues.push({source: 'login', message: errMessages.login })
    
        const len = password?.length ?? 0

        if(len < 8 || len > 64)
            issues.push({source: 'password', message: errMessages.password })
        
        if(password !== confirmPassword)
            issues.push({source: 'confirm-password', message: errMessages.confirmPassword })

        return handleIssues(document, issues)
    }

    const [email, setEmail] = useState(null)
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [login, setLogin] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <h2>Zarejestruj się</h2>
                <div className="input">
                    <label htmlFor="email">Adres email</label>
                    <input type="text" name="email" id="email"
                           onChange={e => setEmail(e.target.value)} />
                    <small className="collapsed" id="err-email"></small>
                </div>
                <div className="input">
                    <label htmlFor="first-name">Imię</label>
                    <input type="text" name="first-name" id="first-name"
                           onChange={e => setFirstName(e.target.value)} />
                    <small className="collapsed" id="err-first-name"></small>
                </div>
                <div className="input">
                    <label htmlFor="last-name">Nazwisko</label>
                    <input type="text" name="last-name" id="last-name"
                           onChange={e => setLastName(e.target.value)} />
                    <small className="collapsed" id="err-last-name"></small>
                </div>
                <div className="input">
                    <label htmlFor="login">Login</label>
                    <input type="text" name="login" id="login"
                           onChange={e => setLogin(e.target.value)} />
                    <small className="collapsed" id="err-login"></small>
                </div>
                <div className="input">
                    <label htmlFor="password">Hasło</label>
                    <input type="text" name="password" id="password"
                           onChange={e => setPassword(e.target.value)} />
                    <small className="collapsed" id="err-password"></small>
                </div>
                <div className="input">
                    <label htmlFor="confirm-password">Potwierdź hasło</label>
                    <input type="text" name="confirm-password" id="confirm-password"
                           onChange={e => setConfirmPassword(e.target.value)}
                           onBlur={e => checkPassword()} />
                    <small className="collapsed" id="err-confirm-password"></small>
                </div>
                <button className="btn">Zarejestruj</button>
            </form>
            <Link to="/">Strona główna</Link>
        </main>
    )
}

export default Register
