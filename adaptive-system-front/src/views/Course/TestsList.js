import { isLoggedIn, getUserDetails } from '../../services/auth'
import { Link } from 'react-router-dom'
import Test from './Test'

const TestsList = ({ enrolled, tests }) => {
  if (!isLoggedIn())
  return <></>

  if (!getUserDetails().roles.includes('student'))
    return <></>
    

  if (!tests?.length > 0)
    return <></>

  if (!tests) return <></>

  return tests.map((test, key) => (
    <Test id={key} test={test} key={key} />
  ))
}

export default TestsList
