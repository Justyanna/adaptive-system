import { default as axios } from './axios'

const courseListUrl = 'http://localhost:8080/courses'

export const getCourseList = () => {
  return axios.get(courseListUrl)
}
