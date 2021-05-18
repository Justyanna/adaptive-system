import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useState } from 'react'

import Home from './views/Home/Home'
import Login from './views/Auth/Login'
import Nav from './views/Nav/Nav'
import Register from './views/Auth/Register'
import Profile from './views/Profile/Profile'
import Admin from './views/Admin/Admin'
import Teacher from './views/Teacher/Teacher'
import Student from './views/Student/Student'
import Questionnaire from './views/Questionnaire/Questionnaire'
import Course from './views/Course/Course'
import CourseEdit from './views/Course/CourseEdit'

function App() {
  let [user, setUser] = useState(
    JSON.parse(localStorage.getItem('eDukatorUser'))
  )

  return (
    <Router>
      <Nav user={user} setUser={setUser} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route exact path="/register">
          <Register setUser={setUser} />
        </Route>
        <Route exact path="/profile">
          <Profile user={user} setUser={setUser} />
        </Route>
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/teacher" component={Teacher} />
        <Route exact path="/student" component={Student} />
        <Route exact path="/questionnaire" component={Questionnaire} />
        <Route exact path="/course/:courseId" component={Course} />
        <Route exact path="/course/:courseId/edit" component={CourseEdit} />
      </Switch>
    </Router>
  )
}

export default App
