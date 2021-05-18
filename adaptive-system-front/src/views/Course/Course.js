import { useParams } from 'react-router-dom'

const Course = () => {
  const { courseId } = useParams()

  return (
    <main className="layout">
      <h2>Kurs {courseId}</h2>
    </main>
  )
}

export default Course
