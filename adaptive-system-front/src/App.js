import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './views/Home'
import Login from './views/Login'
import Nav from './views/Nav'
import Register from './views/Register'

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </Switch>
    </Router>
  )
}

export default App
