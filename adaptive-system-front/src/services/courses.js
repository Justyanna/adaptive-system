import { default as axios } from './axios'

const courseListUrl = 'courses'
const courseUrl = 'course/'
const teacherCourseListUrl = 'teacher/courses'

export const getCourseList = _ => {
  return axios.get(courseListUrl)
}

export const getTeacherCourseList = _ => {
  return axios.get(teacherCourseListUrl)
}

export const getCourse = id => {
  return axios.get(courseUrl + id)
}

export const createCourse = data => {
  return axios.post(courseUrl, data)
}
