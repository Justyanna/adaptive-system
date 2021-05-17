const CourseCard = ({ course }) => {
  return (
    <li className="card">
      <p>{course.name}</p>
      <p>{course.category}</p>
      <button className="btn">Ustawienia</button>
      <button className="btn">Edytuj</button>
      <button className="btn">Testuj</button>
      <button className="btn">Usuń</button>
    </li>
  )
}

export default CourseCard
