import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getCourseList } from '../../services/courses'
import { enrollAtCourse } from '../../services/users'
import { objIsEmpty } from '../../utils'

const Course = () => {
  const { courseId } = useParams()

  const [course, setCourse] = useState({})

  useEffect(
    _ => {
      ;(async _ => {
        const res = await getCourseList()
        setCourse(res.data.filter(c => c._id === courseId)[0])
      })()
    },
    [courseId]
  )

  const enroll = async _ => {
    console.log(await enrollAtCourse({ name: course.name }))
  }

  return (
    <main className="layout">
      {objIsEmpty(course) ? (
        <h2>Kurs {courseId}</h2>
      ) : (
        <>
          <h2>Kurs {course.name}</h2>
          <div>
            <button className="btn action" onClick={enroll}>
              Zapisz się
            </button>
          </div>
        </>
      )}
    </main>
  )
}

export default Course
