// import { useState } from 'react'
import ActivityEdit from './ActivityEdit'

const ActivityList = ({ activities, setActivityList }) => {
  const addActivity = () => {
    setActivityList([
      ...activities,
      {
        type: 'essential',
        components: []
      }
    ])
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
