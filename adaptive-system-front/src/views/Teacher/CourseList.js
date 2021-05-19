import CourseCard from './CourseCard'

export const CourseList = ({ courses }) => {
  if (!courses?.length > 0) return <p>Nie prowadzisz jeszcze żadnych kursów</p>
  return (
    <ul className="list">
      {courses.map((course, key) => (
        <CourseCard course={course} key={key} />
      ))}
    </ul>
  )
}
