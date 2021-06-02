import Lesson from './Lesson'
import { isLoggedIn, getUserDetails } from '../../services/auth'
import { Link } from 'react-router-dom'

const LessonsList = ({ enrolled, lessons }) => {
  if (!isLoggedIn())
    return <div>Aby zapisać się na kurs, należy się zalogować.</div>

  if (!getUserDetails().roles.includes('student'))
    return (
      <div>
        Zanim przystąpisz do zapisywania się na kursy musisz wypełnić
        <Link className='link' to='/questionnaire'>
           ankietę
        </Link>
        .
      </div>
    )

  if (!lessons?.length > 0)
    return <div>Kurs nie zawiera jeszcze żadnej treści.</div>

  if (!enrolled) return <></>

  return lessons.map((lesson, key) => (
    <Lesson id={key} lesson={lesson} key={key} />
  ))
}

export default LessonsList
