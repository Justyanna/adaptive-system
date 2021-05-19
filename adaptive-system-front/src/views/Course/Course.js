import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { isLoggedIn } from '../../services/auth'
import { getCourse } from '../../services/courses'
import { enrollAtCourse, getUserCourseList } from '../../services/users'
import { objIsEmpty } from '../../utils'
import ActivityList from './ActivityList'
import EnrollUi from './EnrollUi'

const Course = () => {
  const { courseId } = useParams()

  const [course, setCourse] = useState({})
  const [enrolled, setEnrolled] = useState({})

  const checkEnrolled = useCallback(
    async _ => {
      if (!isLoggedIn()) return
      const res = await getUserCourseList(courseId)
      setEnrolled(
        res.data.courses.filter(course => course._id === courseId).length > 0
      )
    },
    [courseId]
  )

  useEffect(
    _ => {
      checkEnrolled()
    },
    [checkEnrolled]
  )

  useEffect(
    _ => {
      ;(async _ => {
        const res = await getCourse(courseId)
        setCourse(res.data)
      })()
    },
    [courseId]
  )

  const enroll = async _ => {
    await enrollAtCourse({ name: course.name })
    checkEnrolled()
  }

  if (objIsEmpty(course)) return <h2>Kurs {courseId}</h2>

  return (
    <main className="layout">
      <>
        <h2>Kurs {course.name}</h2>
        <EnrollUi enrolled={enrolled} enroll={enroll} />
        <ActivityList activities={course.lessons} />
      </>
    </main>
  )
}

export default Course
