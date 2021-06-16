import { useHistory, Link } from 'react-router-dom'

const CourseCard = ({ course }) => {
  const history = useHistory()

  const goToCourse = _ => {
    history.push(`/course/${course._id}`)
  }

  return (
    <li className='card' style={{ display: 'flex', flexDirection: 'column' }}>
      <h3>
        <Link to={`course/${course._id}`}>{course.name}</Link>
      </h3>
      <p>{course.category}</p>
      <p
        style={{ fontStyle: 'italic' }}
      >{`${course.author.firstName} ${course.author.lastName}`}</p>
      <button
        className='btn navigation'
        onClick={goToCourse}
        style={{ alignSelf: 'flex-end', marginTop: '-3em' }}
      >
        Przejdź
      </button>
    </li>
  )
}

export default CourseCard
