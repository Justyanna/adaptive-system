import Lesson from './Lesson'

const ActivityList = ({ activities }) => {
  if (!activities?.length > 0)
    return <div>Kurs nie zawiera jeszcze żadnej treści</div>
  return activities.map((activity, key) => (
    <Lesson contents={activity.contents} key={key} />
  ))
}

export default ActivityList
