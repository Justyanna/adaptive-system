import { default as axios } from './axios'

const questionnaireUrl = 'questionnaire'

export const getQuestions = _ => {
  return axios.get(questionnaireUrl)
}
