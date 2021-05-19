import styles from './Admin.module.css'

const CourseItem = ({ course }) => {
  return <li className={styles['item']}>{course.name}</li>
}

export default CourseItem
