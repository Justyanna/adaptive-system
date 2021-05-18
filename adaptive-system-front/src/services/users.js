import { default as axios } from './axios'

const questionnaireUrl = 'questionnaire'

export const getQuestion = _ => {
  return axios.get(questionnaireUrl)
}

export const answerQuestion = answer => {
  return axios.post(questionnaireUrl, { answer })
}
