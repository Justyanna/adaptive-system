import { useState } from 'react'
import ActivityList from '../CourseEdit/ActivityList'

const LessonEdit = ({ data, updateLesson, setEdit, idx }) => {
  const [activityList, _setActivityList] = useState(data.activities)
  const [lesson, setLesson] = useState(data)

  const setActivityList = data => {
    _setActivityList(data)
    setLesson({ ...lesson, activities: data })
  }

  const saveAndQuit = () => {
    updateLesson(idx, lesson)
    setEdit(-1)
  }

  return (
    <div>
      <header>
        <h2>{lesson.title}</h2>
        <p>{lesson.description}</p>
        <button className='btn' onClick={saveAndQuit}>
          Zapisz
        </button>
      </header>
      <ActivityList
        activities={activityList}
        setActivityList={setActivityList}
      />
    </div>
  )
}

export default LessonEdit
