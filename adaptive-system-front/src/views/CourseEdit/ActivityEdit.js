import { useContext } from 'react'
import styles from './CourseEdit.module.css'
import ActivityEditEssential from './ActivityEditEssential'
import ActivityEditAdditional from './ActivityEditAdditional'
import ActivityEditContextual from './ActivityEditContextual'
import ActivityEditSpecial from './ActivityEditSpecial'
import { LessonContext } from './LessonEdit'
import { CourseContext } from './CourseEdit'

const activityTags = {
  essential: 'kluczowa',
  additional: 'dodatkowa',
  contextual: 'kontekstowa',
  special: 'specjalna'
}

const renderActivity = type => {
  switch (type) {
    case 'essential':
      return <ActivityEditEssential />
    case 'additional':
      return <ActivityEditAdditional />
    case 'contextual':
      return <ActivityEditContextual />
    case 'special':
      return <ActivityEditSpecial />
    default:
      return <></>
  }
}

const ActivityEdit = ({ activity, addActivity, idx }) => {
  const { setSaved } = useContext(CourseContext)
  const { activities, setActivityList } = useContext(LessonContext)

  const moveActivityUp = () => {
    const tmp = [...activities]
    const el = tmp.splice(idx, 1)
    tmp.splice(idx - 1, 0, ...el)
    setActivityList(tmp)
    setSaved(false)
  }

  const moveActivityDown = () => {
    const tmp = [...activities]
    const el = tmp.splice(idx, 1)
    tmp.splice(idx + 1, 0, ...el)
    setActivityList(tmp)
    setSaved(false)
  }

  const removeActivity = () => {
    const tmp = [...activities]
    tmp.splice(idx, 1)
    setActivityList(tmp)
    setSaved(false)
  }

  return (
    <section className={`card ${styles['activity-list-item']}`}>
      <header className={styles['activity-header']}>
        <h2>{`Aktywność ${activityTags[activity.type]}`}</h2>

        <div className={styles['lesson-ui']}>
          <div className={styles['lesson-ui-item']}>
            <button
              className={`btn btn-wide ${'btn-move-up'}`}
              disabled={idx < 1}
              onClick={moveActivityUp}
            >
              W górę
            </button>
          </div>
          <div className={styles['lesson-ui-item']}>
            <button
              className={`btn btn-wide ${'btn-move-down'}`}
              disabled={idx >= activities.length - 1}
              onClick={moveActivityDown}
            >
              W dół
            </button>
          </div>
          <div className={styles['lesson-ui-item']}>
            <button
              className={`btn btn-wide ${'btn-del-lesson'} error`}
              onClick={removeActivity}
            >
              Usuń
            </button>
          </div>
        </div>
      </header>
      {renderActivity(activity.type)}
      <div className={styles['ui-new-unit']}>
        <button
          className={`btn btn-wide ${'btn-add-lesson'}`}
          onClick={() => addActivity(idx, 'essential')}
        >
          Kluczowa
        </button>
        <button
          className={`btn btn-wide ${'btn-add-test'}`}
          onClick={() => addActivity(idx, 'additional')}
        >
          Dodatkowa
        </button>
        <button
          className={`btn btn-wide ${'btn-add-test'}`}
          onClick={() => addActivity(idx, 'contextual')}
        >
          Kontekstowa
        </button>
        <button
          className={`btn btn-wide ${'btn-add-test'}`}
          onClick={() => addActivity(idx, 'special')}
        >
          Specjalna
        </button>
      </div>
    </section>
  )
}

export default ActivityEdit
