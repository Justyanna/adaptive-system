import { useState, useEffect, useContext } from 'react';
import { getCourse } from '../../services/courses';
import { useParams } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext'
import Activity from './Activity';
import { adaptUser } from "../../services/users"
import Modal from '../../components/Modal/Modal'
import styles from './Course.module.css'

const Activities = () => {
	const history = useHistory();
	const location = useLocation();
	const [ course, setCourse ] = useState({});
	let { courseId, lessonId } = useParams();
	const [activityId, setActivityId] = useState(0);
	const [modal, showModal] = useState(false)
	const { user } = useContext(UserContext)
	const activities = course.lessons && course.lessons[lessonId].activities.filter(activity => !(activity?.weight < (user.yAxis + 1 ) * 0.5))
  
	useEffect(
		(_) => {
			(async (_) => {
				const res = await getCourse(courseId);
				setCourse(res.data);
			})();
		},
		[ courseId ]
	);

	const handleGoToNextActivity = () => {
		if(activityId + 1 < activities.length)
		setActivityId(activityId + 1);
	};

	const handleGoToPrevActivity = () => {
		if(activityId - 1 > -1)
		setActivityId(activityId-1);
	};

	const handlShowModal = () => {
		showModal(true)
	};


	const handleGoToLesson = () => {
		history.push(location.pathname.substring(0, location.pathname.lastIndexOf(lessonId)-1));
	};

	const handleSendShortResponse = async() =>{
		let amount = document.querySelector('[name="amount"][checked]')?.value;
		let lesson = document.querySelector('[name="lesson"][checked]')?.value;
		await adaptUser({"amount": amount, "lesson": lesson})
		showModal(false)
	}

	return (
		<>
		<div>
			{activities?.length > 0 ? 
			<>
				<Activity activity={activities[activityId]}/>
				{	activityId > 0 && 
					<button className={`btn`}  onClick={handleGoToPrevActivity}>
						Poprzednia
					</button>
				}
				{	activityId < activities.length-1 &&
					<button className={`btn`} onClick={handleGoToNextActivity}>
						Następna
					</button>
				}
				{	activityId == activities.length-1 &&
					<button className={`btn`}  onClick={handlShowModal}>
						Wypełnij krótką ankietę
					</button>
				}
				<div>
					<button className={`btn`} onClick={handleGoToLesson}>
							Wróc
					</button>
				</div>
			</>
			 : (
				<h2> Nic tu jeszcze nie ma. Ale już wkrótce... </h2>
			)}
		</div>
		<Modal visible={modal} setVisible={showModal}>
        	<h2>Ocena aspektów kursu:</h2>
			<div>
				<h4>Czy ilość materiałów była wystarczająca?</h4>
				Za mało &nbsp;
				<input type='radio' name='amount' value='1'></input>
				<input type='radio' name='amount' value='2'></input>
				<input type='radio' name='amount' value='3'></input>
				<input type='radio' name='amount' value='4'></input>
				<input type='radio' name='amount' value='5'></input>
				&nbsp;Za dużo

			</div>
			<div>
				<h4>Czy treść lekcji była interesująca?</h4>
				Zdecydowanie nie &nbsp;
				<input type='radio' name='lesson' value='1'></input>
				<input type='radio' name='lesson' value='2'></input>
				<input type='radio' name='lesson' value='3'></input>
				<input type='radio' name='lesson' value='4'></input>
				<input type='radio' name='lesson' value='5'></input>
				&nbsp; Zdecydowanie tak

			</div>
			<button className={`btn`} onClick={handleSendShortResponse}>
				Prześlij
			</button>
       
        </Modal>
		</>
	);
};

export default Activities;
