import { default as axios } from './axios'

const questionnaireUrl = 'questionnaire'
const userCourseListUrl = 'user/courses'
const userRoleUrl = 'user/role'
const enrollUrl = 'user/enroll'
const userListUrl = 'users'

export const getQuestion = _ => {
  return axios.get(questionnaireUrl)
}

export const answerQuestion = answer => {
  return axios.post(questionnaireUrl, { answer })
}

export const getUserCourseList = _ => {
  return axios.get(userCourseListUrl)
}

export const enrollAtCourse = data => {
  return axios.post(enrollUrl, data)
}

export const toggleUserRole = data => {
  return axios.post(userRoleUrl, data)
}

export const getUserList = _ => {
  return axios.get(userListUrl)
}
