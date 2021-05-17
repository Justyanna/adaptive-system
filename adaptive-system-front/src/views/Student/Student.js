import { useState, useEffect } from 'react'
import CourseCard from './CourseCard'

const Student = () => {
  let [courseList, setCourseList] = useState(null)

  useEffect(_ => {
    setCourseList(getCourseList())
  }, [])

  let getCourseList = _ => {
    return [
      {
        name: 'Kurs 1',
        author: 'Janina Kowalska',
        category: 'Przyroda',
      },
      {
        name: 'Kurs 2',
        author: 'Janina Kowalska',
        category: 'Matematyka',
      },
      {
        name: 'Kurs 5',
        author: 'Jan Kowalski',
        category: 'Matematyka',
      },
    ]
  }

  return (
    <main>
      <h2>Twoje kursy</h2>
      {courseList === null ? (
        <p>Nie masz jeszcze żadnych kursów</p>
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

export default Student
