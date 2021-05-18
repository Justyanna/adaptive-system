import { default as axios } from './axios'

const courseListUrl = 'courses'
const courseUrl = 'course/'

export const getCourseList = () => {
  return axios.get(courseListUrl)
}

export const getCourse = id => {
  return axios.get(courseUrl + id)
}
