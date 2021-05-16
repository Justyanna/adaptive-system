import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './views/Home'
import Login from './views/Login'
import Nav from './views/Nav'
import Register from './views/Register'
import Profile from './views/Profile'
import Admin from './views/Admin'
import Teacher from './views/Teacher'
import Student from './views/Student'

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/teacher" component={Teacher} />
        <Route exact path="/student" component={Student} />
      </Switch>
    </Router>
  )
}

export default App
