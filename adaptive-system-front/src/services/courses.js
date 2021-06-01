import { default as axios } from './axios'

const courseListUrl = 'courses'
const courseUrl = 'course/'
const teacherCourseListUrl = 'teacher/courses'
const categoryListUrl = 'categories'

export const getCourseList = _ => {
  return axios.get(courseListUrl)
}

export const getTeacherCourseList = _ => {
  return axios.get(teacherCourseListUrl)
}

export const getCourse = id => {
  return axios.get(courseUrl + id)
}

export const updateCourse = (id, data) => {
  return axios.put(courseUrl + id, data)
}

export const createCourse = data => {
  return axios.post(courseUrl, data)
}

export const getCategoryList = _ => {
  return axios.get(categoryListUrl)
}
