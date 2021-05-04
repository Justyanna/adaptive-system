import { Link, useLocation } from 'react-router-dom'

const Nav = () => {
    const location = useLocation()

    if(['/login', '/register'].includes(location.pathname))
        return (<></>);

    return (
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/login'>Sign in</Link></li>
                <li><Link to='/register'>Sign up</Link></li>
            </ul>
        </nav>
    )
}

export default Nav
