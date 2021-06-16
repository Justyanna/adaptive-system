import { useState, useEffect, createContext } from 'react'
import { useParams } from 'react-router-dom'
import { getCourse, updateCourse } from '../../services/courses'
import LessonEdit from './LessonEdit'
import LessonList from './LessonList'

export const CourseContext = createContext(null)

const Course = () => {
  const { courseId } = useParams()

  const [course, setCourse] = useState(null)
  const [lessonList, setLessonList] = useState(null)
  const [saved, setSaved] = useState(true)
  const [edit, setEdit] = useState(-1)

  useEffect(() => {
    let mounted = true
    getCourse(courseId).then(({ data }) => {
      if (!mounted) return
      setLessonList(data.lessons)
      delete data.lessons
      setCourse(data)
    })
    return () => {
      mounted = false
    }
  }, [courseId])

  const saveChanges = async () => {
    try {
      const res = await updateCourse(courseId, {
        ...course,
        lessons: lessonList
      })
      setSaved(true)
    } catch (e) {
      console.dir(e)
    }
  }

  const addLesson = () => {
    setLessonList([
      ...lessonList,
      {
        title: `Lekcja ${lessonList.length + 1}`,
        description: 'Nowa lekcja',
        activities: []
      }
    ])
    setSaved(false)
  }

  const updateLesson = (idx, updated) => {
    const tmp = lessonList
    tmp.splice(idx, 1, updated)
    setLessonList(tmp)
    setSaved(false)
  }

  const moveLessonUp = idx => {
    const tmp = [...lessonList]
    const el = tmp.splice(idx, 1)
    tmp.splice(idx - 1, 0, ...el)
    setLessonList(tmp)
    setSaved(false)
  }

  const moveLessonDown = idx => {
    const tmp = [...lessonList]
    const el = tmp.splice(idx, 1)
    tmp.splice(idx + 1, 0, ...el)
    setLessonList(tmp)
    setSaved(false)
  }

  const removeLesson = idx => {
    const tmp = [...lessonList]
    tmp.splice(idx, 1)
    setLessonList(tmp)
    setSaved(false)
  }

  if (!course)
    return (
      <main className='layout'>
        <h1>Kurs {courseId} (wersja edytowalna)</h1>
      </main>
    )

  return (
    <main className='layout'>
      <CourseContext.Provider
        value={{
          addLesson,
          updateLesson,
          moveLessonUp,
          moveLessonDown,
          removeLesson,
          saveChanges,
          saved,
          setSaved,
          setEdit
        }}
      >
        {edit < 0 ? (
          <>
            <h2 style={{ marginBottom: '0.5rem' }}>
              {course.name} (edytowanie)
            </h2>
            <LessonList lessons={lessonList} saved={saved} />
          </>
        ) : (
          <LessonEdit data={lessonList[edit]} idx={edit} />
        )}
      </CourseContext.Provider>
    </main>
  )
}

export default Course
