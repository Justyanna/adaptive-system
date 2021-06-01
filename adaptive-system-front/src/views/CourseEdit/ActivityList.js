import { useContext } from 'react'
import ActivityEdit from './ActivityEdit'
import { CourseContext } from './CourseEdit'

const ActivityList = ({ activities, setActivityList }) => {
  const { setSaved } = useContext(CourseContext)

  const addActivity = () => {
    setActivityList([
      ...activities,
      {
        type: 'essential',
        components: []
      }
    ])
    setSaved(false)
  }

  return (
    <section>
      <div>
        <button className='btn btn-add-lesson' onClick={addActivity}>
          Dodaj aktywność
        </button>
      </div>
      {activities?.length > 0 ? (
        activities.map((activity, key) => (
          <ActivityEdit data={activity} key={key} />
        ))
      ) : (
        <p>Brak aktywności</p>
      )}
    </section>
  )
}

export default ActivityList
