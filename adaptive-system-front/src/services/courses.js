import { default as axios } from './axios'

const courseListUrl = 'courses'

export const getCourseList = () => {
  return axios.get(courseListUrl)
}
