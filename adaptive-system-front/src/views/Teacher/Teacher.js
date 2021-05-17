import { useState, useEffect } from 'react'
import CourseCard from '../Teacher/CourseCard'

const Teacher = () => {
  let [courseList, setCourseList] = useState(null)

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
    <main>
      <h2>Prowadzone kursy</h2>
      {courseList === null ? (
        <p>Nie prowadzisz jeszcze żadnych kursów</p>
      ) : (
        <ul>
          {courseList.map((course, key) => (
            <CourseCard course={course} key={key} />
          ))}
        </ul>
      )}
    </main>
  )
}

export default Teacher
