import { useContext } from 'react'
import ActivityEdit from './ActivityEdit'
import { CourseContext } from './CourseEdit'
import { LessonContext } from './LessonEdit'

const ActivityList = () => {
  const { setSaved } = useContext(CourseContext)
  const { activities, setActivityList } = useContext(LessonContext)

  const addActivity = (idx, activity) => {
    const tmp = activities
    tmp.splice(idx + 1 || 0, 0, { type: activity, components: [] })
    setActivityList(tmp)
    setSaved(false)
  }

  return (
    <section>
      <div>
        <button
          className={`btn btn-wide ${'btn-add-activity'}`}
          onClick={() => addActivity(NaN, 'essential')}
        >
          Kluczowa
        </button>
        <button
          className={`btn btn-wide ${'btn-add-activity'}`}
          onClick={() => addActivity(NaN, 'additional')}
        >
          Dodatkowa
        </button>
        <button
          className={`btn btn-wide ${'btn-add-activity'}`}
          onClick={() => addActivity(NaN, 'contextual')}
        >
          Kontekstowa
        </button>
        <button
          className={`btn btn-wide ${'btn-add-activity'}`}
          onClick={() => addActivity(NaN, 'special')}
        >
          Specjalna
        </button>
      </div>
      {activities?.length > 0 ? (
        activities.map((activity, key) => (
          <ActivityEdit
            activity={activity}
            addActivity={addActivity}
            idx={key}
            key={key}
          />
        ))
      ) : (
        <p>Brak aktywności</p>
      )}
    </section>
  )
}

export default ActivityList
