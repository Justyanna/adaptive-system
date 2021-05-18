import { Link } from 'react-router-dom'
import styles from './Home.module.css'

const CourseCard = ({ course }) => {
  return (
    <li className="card">
      <p className={styles['course-name']}>{course.name}</p>
      <p className={styles['course-category']}>{course.category}</p>
      <p className={styles['course-author']}>{course.author}</p>
      <Link
        className={`link ${styles['course-nav']}`}
        to={`course/${course._id}`}
      >
        Zobacz
      </Link>
    </li>
  )
}

export default CourseCard
