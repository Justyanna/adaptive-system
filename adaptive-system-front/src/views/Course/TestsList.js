import { isLoggedIn, getUserDetails } from '../../services/auth'
import { Link } from 'react-router-dom'
import Test from './Test'

const TestsList = ({ enrolled, tests }) => {
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

  if (!tests?.length > 0)
    return <></>

  if (!tests) return <></>

  return tests.map((test, key) => (
    <Test id={key} test={test} key={key} />
  ))
}

export default TestsList
