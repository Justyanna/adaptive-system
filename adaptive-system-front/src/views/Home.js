import { useState, useEffect } from 'react'
import { getCourseList } from '../services/courses'

const Home = () => {
  const [courseList, setCourseList] = useState(null)

  useEffect(() => {
    ;(async () => {
      let res = await getCourseList()
      setCourseList(res.data)
    })()
  }, [])

  return (
    <div>
      <h2>Strona główna</h2>
      {courseList === null ? (
        <p>Nie ma jeszcze żadnych kursów</p>
      ) : (
        <ul className="list">
          {courseList.map(course => (
            <li className="list-item" key={course._id}>
              {course.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Home
