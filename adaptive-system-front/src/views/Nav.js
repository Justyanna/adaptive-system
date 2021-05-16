import { Link, useLocation } from 'react-router-dom'

const Nav = () => {
  const location = useLocation()

  if (['/login', '/register'].includes(location.pathname)) return <></>

  let signOut = _ => {
    localStorage.removeItem('eDukacjaToken')
    localStorage.removeItem('eDukacjaUser')
  }

  return (
    <nav className="h nav">
      <ul className="h nav-list">
        <li>
          <Link className="nav-item" to="/">
            Strona główna
          </Link>
        </li>
      </ul>
      <ul className="h nav-list">
        {localStorage.getItem('eDukacjaUser') === null
          ? [
              <li>
                <Link className="nav-item" to="/login">
                  Zaloguj się
                </Link>
              </li>,
              <li>
                <Link className="nav-item" to="/register">
                  Zarejestruj się
                </Link>
              </li>,
            ]
          : [
              <li>
                <Link className="nav-item" to="/profile">
                  {JSON.parse(localStorage.getItem('eDukacjaUser'))?.firstname}
                </Link>
              </li>,
              <li>
                <Link className="nav-item" onClick={signOut}>
                  Wyloguj
                </Link>
              </li>,
            ]}
      </ul>
    </nav>
  )
}

export default Nav
