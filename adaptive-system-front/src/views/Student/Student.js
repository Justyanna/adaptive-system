import { useState, useEffect } from 'react'
import CourseCard from './CourseCard'
import { getUserCourseList } from '../../services/users'

const Student = () => {
  let [courseList, setCourseList] = useState([])

  useEffect(_ => {
    ;(async _ => {
      setCourseList(await getCourseList())
    })()
  }, [])

  let getCourseList = async _ => {
    const res = await getUserCourseList()
    return res.data.courses
  }

  return (
    <main className="layout">
      <h2>Twoje kursy</h2>
      {courseList.length === 0 ? (
        <p>Nie bierzesz udziału w żadnym kursie</p>
      ) : (
        <ul className="list">
          {courseList.map((course, key) => (
            <CourseCard course={course} key={key} />
          ))}
        </ul>
      )}
    </main>
  )
}

export default Student
