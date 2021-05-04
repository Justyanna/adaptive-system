import { Link, useLocation } from 'react-router-dom'

const Nav = () => {
    const location = useLocation()

    if(['/login', '/register'].includes(location.pathname))
        return (<></>);

    return (
        <nav>
            <ul className="nav-list">
                <li><Link className="nav-item" to='/'>Strona główna</Link></li>
                <li><Link className="nav-item" to='/login'>Zaloguj się</Link></li>
                <li><Link className="nav-item" to='/register'>Zarejestruj się</Link></li>
            </ul>
        </nav>
    )
}

export default Nav
