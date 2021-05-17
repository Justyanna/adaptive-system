const CourseCard = ({ course }) => {
  return (
    <li className="card">
      <p>{course.name}</p>
      <p>{course.category}</p>
      <p>{course.author}</p>
      <button className="btn">Przejdź</button>
    </li>
  )
}

export default CourseCard
