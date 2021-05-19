import { useState, useEffect } from 'react'
import { CourseList } from './CourseList'
import NewCourseForm from './NewCourseForm'

const Teacher = () => {
  const [courseList, setCourseList] = useState(null)

  useEffect(_ => {
    setCourseList(getCourseList())
  }, [])

  let getCourseList = _ => {
    return [
      {
        name: 'Kurs 1',
        author: 'Jan Adminowicz',
        category: 'Przyroda',
      },
      {
        name: 'Kurs 2',
        author: 'Jan Adminowicz',
        category: 'Matematyka',
      },
      {
        name: 'Kurs 5',
        author: 'Jan Adminowicz',
        category: 'Matematyka',
      },
    ]
  }

  return (
    <main className="layout">
      <h2>Aktualności</h2>
      <h2>Prowadzone kursy</h2>
      <NewCourseForm />
      <CourseList courses={courseList} />
    </main>
  )
}

export default Teacher
