import { useState, useEffect } from 'react'
import { getCourseList } from '../../services/courses'
import CourseCard from './CourseCard'
// import styles from './Home.module.css'

const Home = () => {
  const [courseList, setCourseList] = useState(null)

  useEffect(() => {
    ;(async () => {
      let res = await getCourseList()
      setCourseList(res.data)
    })()
  }, [])

  return (
    <main className="layout">
      <h2>Dostępne kursy</h2>
      {courseList === null ? (
        <p>Nie ma jeszcze żadnych kursów</p>
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

export default Home
