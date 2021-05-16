import React, { useState, useEffect } from 'react'
import { getQuestions } from '../services/users'

const Questionnaire = () => {
  let [questions, setQuestions] = useState(null)

  useEffect(() => {
    ;(async () => {
      let res = await getQuestions()
      setQuestions(res.data.questions)
    })()
  }, [])

  return (
    <div>
      <h2>Strona główna</h2>
      {questions === null ? (
        <p>Nie ma jeszcze żadnych kursów</p>
      ) : (
        <ul className="list">
          {questions.map((question, id) => (
            <li className="list-item" key={id}>
              {question}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Questionnaire
