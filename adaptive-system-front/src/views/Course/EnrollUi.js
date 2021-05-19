import { isLoggedIn } from '../../services/auth'

const EnrollUi = ({ enrolled, enroll }) => {
  if (!isLoggedIn()) return <></>

  if (enrolled)
    return (
      <div>
        <p>Zapisano</p>
      </div>
    )

  return (
    <div>
      <button className="btn action" onClick={enroll}>
        Zapisz się
      </button>
    </div>
  )
}

export default EnrollUi
