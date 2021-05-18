import { default as axios } from './axios'

const questionnaireUrl = 'questionnaire'

export const getQuestion = _ => {
  return axios.get(questionnaireUrl)
}
