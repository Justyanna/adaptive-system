import React, { useEffect } from 'react'
import { getQuestions } from '../services/users'

const Questionnaire = () => {
  useEffect(() => {
    ;(async () => {
      let res = await getQuestions()
      console.log(res)
    })()
  }, [])

  return <div>Ankieta</div>
}

export default Questionnaire
