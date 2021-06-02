import styles from './Course.module.css';
import { useHistory, useLocation } from 'react-router-dom';

const Lesson = ({ lesson, id }) => {
	const history = useHistory();
	const location = useLocation();

	const handleGoToActivities = () => {
		history.push(location.pathname + '/' + id);
	};

	return (
		<div className={`card flow ${styles.activity}`}>
			<div className={styles['lesson-info']}>
				<h2 className={styles['lesson-title']}>{lesson.title}</h2>
				<p className={styles['lesson-description']}>{lesson.description}</p>
			</div>
			<button className={`btn btn-wide ${'btn-save-test'}`} onClick={handleGoToActivities}>
				Przejdź
			</button>
		</div>
	);
};

export default Lesson;
