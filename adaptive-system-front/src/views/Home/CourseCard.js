import { Link } from 'react-router-dom'
import styles from './Home.module.css'

const CourseCard = ({ course }) => {
  return (
    <li className='card' style={{ display: 'flex', flexDirection: 'column' }}>
      <h3>
        <Link to={`course/${course._id}`}>{course.name}</Link>
      </h3>
      <p className={styles['course-category']}>{course.category}</p>
      <p
        className={styles['course-author']}
      >{`${course.author.firstName} ${course.author.lastName}`}</p>
      <Link
        className={`link ${styles['course-nav']}`}
        to={`course/${course._id}`}
        style={{ alignSelf: 'flex-end', marginTop: '-1.4em' }}
      >
        Zobacz
      </Link>
    </li>
  )
}

export default CourseCard
