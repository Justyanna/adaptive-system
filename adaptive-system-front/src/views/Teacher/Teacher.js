import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { CourseList } from './CourseList'
import AddCourseForm from './AddCourseForm'
import { getTeacherCourseList } from '../../services/courses'

const Teacher = () => {
  const history = useHistory()

  const [courseList, setCourseList] = useState(null)

  useEffect(() => {
    let mounted = true
    getTeacherCourseList()
      .then(({ data }) => {
        if (mounted) setCourseList(data)
      })
      .catch(_ => {
        if (mounted) history.push('/')
      })
    return _ => {
      mounted = false
    }
  }, [history])

  return (
    <main className='layout'>
      <AddCourseForm />
      <h2 style={{ marginTop: '1em' }}>Prowadzone kursy</h2>
      {courseList && <CourseList courses={courseList} />}
    </main>
  )
}

export default Teacher
