import { useHistory } from 'react-router-dom'

const CourseCard = ({ course }) => {
  const history = useHistory()

  const goToCourse = _ => {
    history.push(`/course/${course._id}`)
  }

  return (
    <li className="card">
      <p>{course.name}</p>
      <p>{course.category}</p>
      <p>{course.author}</p>
      <button className="btn" onClick={goToCourse}>
        Przejdź
      </button>
    </li>
  )
}

export default CourseCard
