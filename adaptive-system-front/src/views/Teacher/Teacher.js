import { useState, useEffect } from 'react'
import { CourseList } from './CourseList'
import AddCourseForm from './AddCourseForm'
import { getTeacherCourseList } from '../../services/courses'

const Teacher = () => {
  const [courseList, setCourseList] = useState(null)

  useEffect(_ => {
    ;(async _ => {
      const res = await getTeacherCourseList()
      setCourseList(res.data)
    })()
  }, [])

  return (
    <main className="layout">
      <h2>Aktualności</h2>
      <h2>Prowadzone kursy</h2>
      <AddCourseForm />
      <CourseList courses={courseList} />
    </main>
  )
}

export default Teacher
