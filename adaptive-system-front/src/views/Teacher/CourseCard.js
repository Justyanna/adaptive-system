import { useHistory } from 'react-router-dom'

const CourseCard = ({ course }) => {
  const history = useHistory()

  console.log(course)

  const goToEdit = _ => {
    history.push(`/course/${course._id}/edit`)
  }

  return (
    <li className="card">
      <p>{course.name}</p>
      <p>{course.category}</p>
      <button className="btn" onClick={goToEdit}>
        Edytuj
      </button>
      <button className="btn btn-err">Usuń</button>
    </li>
  )
}

export default CourseCard
