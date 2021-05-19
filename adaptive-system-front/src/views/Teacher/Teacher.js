import { useState, useEffect } from 'react'
import { CourseList } from './CourseList'
import AddCourseForm from './AddCourseForm'
import { getCategoryList, getTeacherCourseList } from '../../services/courses'

const Teacher = () => {
  const [courseList, setCourseList] = useState(null)
  const [categoryList, setCategoryList] = useState([])

  useEffect(_ => {
    ;(async _ => {
      let res = await getTeacherCourseList()
      setCourseList(res.data)
      res = await getCategoryList()
      setCategoryList(res.data)
    })()
  }, [])

  return (
    <main className="layout">
      <h2>Aktualności</h2>
      <h2>Prowadzone kursy</h2>
      <AddCourseForm categories={categoryList} />
      <CourseList courses={courseList} />
    </main>
  )
}

export default Teacher
