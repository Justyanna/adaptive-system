import { Link, NavLink, useLocation } from 'react-router-dom'
import React from 'react'
import styles from './Nav.module.css'

const Nav = ({ user, setUser }) => {
  const location = useLocation()

  let signOut = _ => {
    localStorage.removeItem('eDukatorToken')
    localStorage.removeItem('eDukatorUser')
    setUser(null)
  }

  if (['/login', '/register'].includes(location.pathname)) return <></>

  return (
    <nav className={styles['nav']}>
      <ul className={styles['nav-list']}>
        <li>
          <Link className={styles['nav-item']} to="/">
            Strona główna
          </Link>
        </li>
        {user?.roles && !user.roles.includes('student') && (
          <li>
            <NavLink
              className={styles['nav-item']}
              activeClassName={styles['nav-item-active']}
              to="/questionnaire"
            >
              Ankieta
            </NavLink>
          </li>
        )}
        {user?.roles?.includes('admin') && (
          <li>
            <NavLink
              className={styles['nav-item']}
              activeClassName={styles['nav-item-active']}
              to="/admin"
            >
              Panel administratora
            </NavLink>
          </li>
        )}
        {user?.roles?.includes('teacher') && (
          <li>
            <NavLink
              className={styles['nav-item']}
              activeClassName={styles['nav-item-active']}
              to="/teacher"
            >
              Panel prowadzącego
            </NavLink>
          </li>
        )}
        {user?.roles?.includes('student') && (
          <li>
            <NavLink
              className={styles['nav-item']}
              activeClassName={styles['nav-item-active']}
              to="/student"
            >
              Panel kursanta
            </NavLink>
          </li>
        )}
      </ul>
      <ul className={styles['nav-list']}>
        {user === null ? (
          <React.Fragment>
            <li>
              <Link className={styles['nav-item']} to="/login">
                Zaloguj się
              </Link>
            </li>
            <li>
              <Link className={styles['nav-item']} to="/register">
                Zarejestruj się
              </Link>
            </li>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <li>
              <NavLink
                className={styles['nav-item']}
                activeClassName={styles['nav-item-active']}
                to="/profile"
              >
                {`${user?.firstName} ${user?.lastName}`}
              </NavLink>
            </li>
            <li>
              <Link className={styles['nav-item']} to="/" onClick={signOut}>
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
