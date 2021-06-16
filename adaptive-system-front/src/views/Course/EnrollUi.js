import { isLoggedIn, getUserDetails } from '../../services/auth'

const EnrollUi = ({ enrolled, enroll }) => {
  if (!isLoggedIn() || !getUserDetails().roles.includes('student')) return <></>

  if (enrolled)
    return (
      <div>
        <p>Zapisano</p>
      </div>
    )

  return (
    <div>
      <button
        className='btn action'
        onClick={enroll}
        style={{ marginTop: '1em' }}
      >
        Zapisz się
      </button>
    </div>
  )
}

export default EnrollUi
