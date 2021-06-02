import { useContext } from 'react'
import ActivityEdit from './ActivityEdit'
import { CourseContext } from './CourseEdit'
import { LessonContext } from './LessonEdit'

const ActivityList = () => {
  const { activities, addActivity, updateActivity } = useContext(LessonContext)

  return (
    <section>
      <div>
        <button
          className={`btn btn-wide ${'btn-add-activity'}`}
          onClick={() => addActivity(-1, 'essential')}
        >
          Kluczowa
        </button>
        <button
          className={`btn btn-wide ${'btn-add-activity'}`}
          onClick={() => addActivity(-1, 'contextual')}
        >
          Kontekstowa
        </button>
        <button
          className={`btn btn-wide ${'btn-add-activity'}`}
          onClick={() => addActivity(-1, 'special')}
        >
          Specjalna
        </button>
      </div>
      {activities?.length > 0 ? (
        activities.map((activity, key) => (
          <ActivityEdit activity={activity} idx={key} key={key} />
        ))
      ) : (
        <p>Brak aktywności</p>
      )}
    </section>
  )
}

export default ActivityList
