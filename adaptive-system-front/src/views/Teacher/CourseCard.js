const CourseCard = ({ course }) => {
  return (
    <li className="card">
      <p>{course.name}</p>
      <p>{course.category}</p>
      <button className="btn">Edytuj</button>
      <button className="btn btn-err">Usuń</button>
    </li>
  )
}

export default CourseCard
