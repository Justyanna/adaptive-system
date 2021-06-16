import styles from './Course.module.css';
import { useHistory, useLocation } from 'react-router-dom';

const Test = ({ test, id }) => {
	const history = useHistory();
	const location = useLocation();

	const handleGoToActivities = () => {
		history.push(location.pathname + '/test/' + id);
	};

	return (
		<div className={`card flow ${styles.activity}`}>
			<div className={styles['lesson-info']}>
				<h2 className={styles['lesson-title']}>{test.title}</h2>
				<p className={styles['lesson-description']}>{test.desc}</p>
			</div>
			<button className={`btn btn-wide ${'btn-save-test'}`} onClick={handleGoToActivities}>
				Przejdź
			</button>
		</div>
	);
};

export default Test;
