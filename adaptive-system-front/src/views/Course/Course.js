import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { isLoggedIn } from '../../services/auth'
import { getCourse } from '../../services/courses'
import { enrollAtCourse, getUserCourseList } from '../../services/users'
import { objIsEmpty } from '../../utils'
import LessonsList from './LessonsList'
import TestsList from './TestsList'
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
    <main className='layout'>
      <h2>{course.name}</h2>
      <EnrollUi enrolled={enrolled} enroll={enroll} />
      <LessonsList enrolled={enrolled} lessons={course.lessons} />
      <TestsList enrolled={enrolled} tests={course.tests} />
    </main>
  )
}

export default Course
