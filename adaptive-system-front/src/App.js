import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useState } from 'react'

import Home from './views/Home'
import Login from './views/Login'
import Nav from './views/Nav'
import Register from './views/Register'
import Profile from './views/Profile'
import Admin from './views/Admin'
import Teacher from './views/Teacher'
import Student from './views/Student'
import Questionnaire from './views/Questionnaire'

function App() {
  let [user, setUser] = useState(localStorage.getItem('eDukatorUser'))

  return (
    <Router>
      <Nav user={user} setUser={setUser} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/login"
          component={_ => <Login setUser={setUser} />}
        />
        <Route
          exact
          path="/register"
          component={_ => <Register setUser={setUser} />}
        />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/teacher" component={Teacher} />
        <Route exact path="/student" component={Student} />
        <Route exact path="/questionnaire" component={Questionnaire} />
      </Switch>
    </Router>
  )
}

export default App
