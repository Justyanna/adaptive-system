import { useState, useContext, createContext } from 'react'
import ActivityList from '../CourseEdit/ActivityList'
import { CourseContext } from './CourseEdit'

export const LessonContext = createContext(null)

const createActivity = (type, lessonTitle) => {
  const activity = {
    type: type ?? 'essential',
    title: lessonTitle ?? 'Pusta aktywność'
  }

  switch (type) {
    case 'essential':
      return { ...activity, components: [], weight: 1.0, mode: 'components' }
    case 'contextual':
      return { ...activity, alpha: [], gamma: [], mode: 'alpha' }
    case 'special':
      return { ...activity, beta: [], delta: [], mode: 'delta' }
    default:
      return { ...activity, components: [] }
  }
}

const LessonEdit = ({ data, idx }) => {
  const { updateLesson, saved, setSaved, setEdit, saveChanges } =
    useContext(CourseContext)
  const [activityList, _setActivityList] = useState(data.activities)
  const [lesson, setLesson] = useState(data)

  const setActivityList = data => {
    _setActivityList(data)
    setLesson({ ...lesson, activities: data })
  }

  const saveLesson = () => {
    if (!saved) {
      updateLesson(idx, lesson)
      saveChanges()
    }
  }

  const saveAndQuit = () => {
    saveLesson()
    setEdit(-1)
  }

  const addActivity = (idx, activity) => {
    const tmp = activityList
    tmp.splice(idx + 1, 0, createActivity(activity, lesson.title))
    setActivityList(tmp)
    setSaved(false)
  }

  const updateActivity = (idx, activity) => {
    const tmp = activityList
    tmp.splice(idx, 1, activity)
    setActivityList(tmp)
    setSaved(false)
  }

  const moveActivityUp = idx => {
    const tmp = [...activityList]
    const el = tmp.splice(idx, 1)
    tmp.splice(idx - 1, 0, ...el)
    setActivityList(tmp)
    setSaved(false)
  }

  const moveActivityDown = idx => {
    const tmp = [...activityList]
    const el = tmp.splice(idx, 1)
    tmp.splice(idx + 1, 0, ...el)
    setActivityList(tmp)
    setSaved(false)
  }

  const removeActivity = () => {
    const tmp = [...activityList]
    tmp.splice(idx, 1)
    setActivityList(tmp)
    setSaved(false)
  }

  return (
    <div>
      <header>
        <h2>{lesson.title}</h2>
        {/* <p>{lesson.description}</p> */}
        <button
          className='btn navigation'
          onClick={saveAndQuit}
          style={{ margin: '1rem 0' }}
        >
          {saved ? 'Wróć' : 'Zapisz i wróć'}
        </button>
        {!saved && (
          <button className='btn' onClick={saveLesson}>
            Zapisz zmiany
          </button>
        )}
      </header>
      <LessonContext.Provider
        value={{
          lesson,
          activities: activityList,
          setActivityList,
          addActivity,
          updateActivity,
          moveActivityUp,
          moveActivityDown,
          removeActivity
        }}
      >
        <ActivityList />
      </LessonContext.Provider>
    </div>
  )
}

export default LessonEdit
