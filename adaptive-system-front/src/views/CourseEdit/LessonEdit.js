import { useState, useContext, createContext } from 'react'
import ActivityList from '../CourseEdit/ActivityList'
import { CourseContext } from './CourseEdit'

export const LessonContext = createContext(null)

const LessonEdit = ({ data, idx }) => {
  const { updateLesson, saved, setEdit, saveChanges } =
    useContext(CourseContext)
  const [activityList, _setActivityList] = useState(data.activities)
  const [lesson, setLesson] = useState(data)

  const setActivityList = data => {
    _setActivityList(data)
    setLesson({ ...lesson, activities: data })
  }

  const saveAndQuit = () => {
    if (!saved) {
      updateLesson(idx, lesson)
      saveChanges()
    }
    setEdit(-1)
  }

  return (
    <div>
      <header>
        <h2>{lesson.title}</h2>
        <p>{lesson.description}</p>
        <button className='btn' onClick={saveAndQuit}>
          {saved ? 'Wróć' : 'Zapisz i wróć'}
        </button>
      </header>
      <LessonContext.Provider
        value={{ activities: activityList, setActivityList }}
      >
        <ActivityList />
      </LessonContext.Provider>
    </div>
  )
}

export default LessonEdit
