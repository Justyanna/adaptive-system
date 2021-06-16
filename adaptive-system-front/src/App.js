import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import { UserContext } from './contexts/UserContext';

import Home from './views/Home/Home';
import Login from './views/Auth/Login';
import Nav from './views/Nav/Nav';
import Register from './views/Auth/Register';
import Profile from './views/Profile/Profile';
import Admin from './views/Admin/Admin';
import Teacher from './views/Teacher/Teacher';
import Student from './views/Student/Student';
import Questionnaire from './views/Questionnaire/Questionnaire';
import Course from './views/Course/Course';
import CourseEdit from './views/CourseEdit/CourseEdit';
import Component from './views/Course/Component';
import Activities from './views/Course/Activities';
import Footer from './views/Footer/Footer';
import Tests from './views/Course/Tests';

function App() {
	let [ user, setUser ] = useState(JSON.parse(localStorage.getItem('eDukatorUser')));

	return (
		<Router>
			<UserContext.Provider value={{ user, setUser }}>
				<Nav />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/profile" component={Profile} />
					<Route exact path="/admin" component={Admin} />
					<Route exact path="/teacher" component={Teacher} />
					<Route exact path="/student" component={Student} />
					<Route exact path="/questionnaire" component={Questionnaire} />
					<Route exact path="/course/edit/:courseId" component={CourseEdit} />
					<Route exact path="/course/:courseId" component={Course} />
					<Route exact path="/course/:courseId/test/:testId" component={Tests} />
					<Route exact path="/course/:courseId/:lessonId" component={Activities} />
					<Route exact path="/course/:courseId/:lessonId/:activityId" component={Component} />
				</Switch>
			</UserContext.Provider>
			<Footer />
		</Router>
	);
}

export default App;
