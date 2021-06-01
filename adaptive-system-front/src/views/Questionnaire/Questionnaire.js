import { useState, useContext, useEffect } from 'react'
import { getQuestion, answerQuestion } from '../../services/users'
import { updateToken, updateUserData } from '../../services/auth'
import { useHistory } from 'react-router-dom'
import styles from './Questionnaire.module.css'
import { UserContext } from '../../contexts/UserContext'

const Questionnaire = () => {
  const history = useHistory()

  const { setUser } = useContext(UserContext)

  const [question, setQuestion] = useState(null)
  const [questionId, setQuestionId] = useState(null)

  useEffect(() => {
    let mounted = true
    getQuestion().then(({ data: { question, id } }) => {
      if (mounted) {
        setQuestion(question)
        setQuestionId(id)
      }
    })
    return () => {
      mounted = false
    }
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await answerQuestion(e.nativeEvent.submitter.id)
    if (questionId < 30) {
      setQuestion(res.data.question)
      setQuestionId(res.data.id)
    } else {
      updateUserData(await updateToken(), setUser)
      history.push('/')
    }
  }

  return (
    <main className={`layout`}>
      <h2 className={styles['heading']}>Ankieta</h2>
      {question === null ? (
        <p className='error'>Pytania są niedostępne</p>
      ) : (
        <form className={styles['question-container']} onSubmit={handleSubmit}>
          <p className={styles['question-contents']}>
            {question} ({questionId + 1}/32)
          </p>
          <div className={styles['question-interface']}>
            <button className={`btn action ${styles.btn}`} id='true'>
              PRAWDA
            </button>
            <button className={`btn action ${styles.btn}`} id='false'>
              FAŁSZ
            </button>
          </div>
        </form>
      )}
    </main>
  )
}

export default Questionnaire
