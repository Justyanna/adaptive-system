import CourseItem from './CourseItem'

const CourseList = ({ courses }) => {
  if (!courses?.length > 0) return <></>
  return (
    <ul className="list">
      {courses.map((course, key) => (
        <CourseItem course={course} key={key} />
      ))}
    </ul>
  )
}

export default CourseList
