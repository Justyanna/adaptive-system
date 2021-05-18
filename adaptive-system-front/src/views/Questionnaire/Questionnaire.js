import React, { useState, useEffect } from 'react'
import { getQuestion, answerQuestion } from '../../services/users'
import styles from './Questionnaire.module.css'
import { updateUserData } from '../../services/auth'

const Questionnaire = ({ setUser }) => {
  const [question, setQuestion] = useState(null)
  const [questionId, setQuestionId] = useState(null)

  useEffect(() => {
    ;(async () => {
      let res = await getQuestion()
      setQuestion(res.data.question)
      setQuestionId(res.data.id)
    })()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await answerQuestion(e.nativeEvent.submitter.id)
    if (questionId < 31) {
      setQuestion(res.data.question)
      setQuestion(res.data.id)
    } else {
      updateUserData(res, setUser)
    }
  }

  return (
    <main className={`layout`}>
      <h2 className={styles['heading']}>Ankieta</h2>
      {question === null ? (
        <p className="error">Pytania są niedostępne</p>
      ) : (
        <form className={styles['question-container']} onSubmit={handleSubmit}>
          <p className={styles['question-contents']}>
            {question} ({questionId + 1}/32)
          </p>
          <div className={styles['question-interface']}>
            <button className={`btn action ${styles.btn}`} id="true">
              PRAWDA
            </button>
            <button className={`btn action ${styles.btn}`} id="false">
              FAŁSZ
            </button>
          </div>
        </form>
      )}
    </main>
  )
}

export default Questionnaire
