import { useHistory } from 'react-router-dom'

const CourseCard = ({ course }) => {
  const history = useHistory()

  const goToEdit = _ => {
    history.push(`/course/edit/${course._id}`)
  }

  return (
    <li className='card flow flow-05'>
      <p>{course.name}</p>
      <p>{course.category}</p>
      <button className='btn navigation' onClick={goToEdit}>
        Edytuj
      </button>
      <button className='btn error'>Usuń</button>
    </li>
  )
}

export default CourseCard
