import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import Home from './views/home/Home'
import Login from './views/login/Login'
import Register from './views/register/Register'

function App() {
  return (
    <Router>
      <header>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/login'>Sign in</Link></li>
          <li><Link to='/register'>Sign up</Link></li>
        </ul>
      </header>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </Switch>
    </Router>
  )
}

export default App
