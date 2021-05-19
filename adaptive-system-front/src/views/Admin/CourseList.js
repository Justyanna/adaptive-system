import CourseItem from './CourseItem'

const CourseList = ({ courses }) => {
  if (!courses?.length > 0) return <></>
  return (
    <>
      <p>Kursy</p>
      {courses.map((course, key) => (
        <CourseItem course={course} key={key} />
      ))}
    </>
  )
}

export default CourseList
