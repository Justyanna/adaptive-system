import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getCourse, updateCourse } from '../../services/courses'
import LessonEdit from './LessonEdit'
import LessonList from './LessonList'

const Course = () => {
  const { courseId } = useParams()

  const [course, setCourse] = useState(null)
  const [lessonList, setLessonList] = useState(null)
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
      console.log(res)
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
  }

  const updateLesson = (idx, updated) => {
    const tmp = lessonList
    tmp.splice(idx, 1, updated)
    setLessonList(tmp)
  }

  const removeLesson = idx => {
    const tmp = [...lessonList]
    tmp.splice(idx, 1)
    setLessonList(tmp)
  }

  if (!course)
    return (
      <main className='layout'>
        <h1>Kurs {courseId} (wersja edytowalna)</h1>
      </main>
    )

  return (
    <main className='layout'>
      <h1>{course.name} (edytowanie)</h1>
      {edit < 0 ? (
        <LessonList
          lessons={lessonList}
          addLesson={addLesson}
          deleteLesson={removeLesson}
          setEdit={setEdit}
          saveChanges={saveChanges}
        />
      ) : (
        <LessonEdit
          data={lessonList[edit]}
          updateLesson={updateLesson}
          setEdit={setEdit}
          idx={edit}
        />
      )}
    </main>
  )
}

export default Course
