import React, { useState, useEffect } from 'react'
import { getQuestion } from '../../services/users'
import styles from './Questionnaire.module.css'

const Questionnaire = () => {
  const [question, setQuestion] = useState(null)

  useEffect(() => {
    ;(async () => {
      let res = await getQuestion()
      setQuestion(res.data.question)
    })()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    console.log(e.nativeEvent.submitter.id)
  }

  return (
    <main className={`layout`}>
      <h2 className={styles['heading']}>Ankieta</h2>
      {question === null ? (
        <p className="error">Pytania są niedostępne</p>
      ) : (
        <form className={styles['question-container']} onSubmit={handleSubmit}>
          <p className={styles['question-contents']}>{question}</p>
          <div className={styles['question-interface']}>
            <button className={`btn ${styles.btn}`} id="true">
              TAK
            </button>
            <button className={`btn ${styles.btn}`} id="false">
              NIE
            </button>
          </div>
        </form>
      )}
    </main>
  )
}

export default Questionnaire
