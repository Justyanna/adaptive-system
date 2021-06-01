import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getCourse } from '../../services/courses'

const Course = () => {
  const { courseId } = useParams()

  const [course, setCourse] = useState(null)

  useEffect(() => {
    let mounted = true
    getCourse(courseId).then(({ data }) => {
      if (mounted) {
        setCourse(data)
        console.log(data)
      }
    })
    return () => {
      mounted = false
    }
  }, [])

  return (
    <main className='layout'>
      {!course ? (
        <h2>Kurs {courseId} (wersja edytowalna)</h2>
      ) : (
        <h2>Kurs {course.name} (wersja edytowalna)</h2>
      )}
    </main>
  )
}

export default Course
