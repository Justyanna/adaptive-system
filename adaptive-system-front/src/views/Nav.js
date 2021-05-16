import { Link, useLocation } from 'react-router-dom'
import React, { useState } from 'react'

const Nav = () => {
  const location = useLocation()

  let [user] = useState(JSON.parse(localStorage.getItem('eDukatorUser')))

  let signOut = _ => {
    localStorage.removeItem('eDukatorToken')
    localStorage.removeItem('eDukatorUser')
  }

  if (['/login', '/register'].includes(location.pathname)) return <></>

  return (
    <nav className="h nav">
      <ul className="h nav-list">
        <li>
          <Link className="nav-item" to="/">
            Strona główna
          </Link>
        </li>
        {user?.roles.includes('admin') ? (
          <li>
            <Link className="nav-item" to="/admin">
              Panel administratora
            </Link>
          </li>
        ) : (
          <></>
        )}
        {user?.roles.includes('teacher') ? (
          <li>
            <Link className="nav-item" to="/teacher">
              Panel nauczyciela
            </Link>
          </li>
        ) : (
          <></>
        )}
        {user?.roles.includes('student') ? (
          <li>
            <Link className="nav-item" to="/student">
              Panel kursanta
            </Link>
          </li>
        ) : (
          <></>
        )}
      </ul>
      <ul className="h nav-list">
        {localStorage.getItem('eDukatorUser') === null ? (
          <React.Fragment>
            <li>
              <Link className="nav-item" to="/login">
                Zaloguj się
              </Link>
            </li>
            <li>
              <Link className="nav-item" to="/register">
                Zarejestruj się
              </Link>
            </li>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <li>
              <Link className="nav-item" to="/profile">
                {`${user?.firstname} ${user?.lastname}`}
              </Link>
            </li>
            <li>
              <Link className="nav-item" to="/" onClick={signOut}>
                Wyloguj
              </Link>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  )
}

export default Nav
