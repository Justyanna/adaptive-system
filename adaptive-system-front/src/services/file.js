import { default as axios } from './axios'

const fileUrl = 'file'

export const uploadFile = (file, course) => {
  const data = new FormData()
  data.append('file', file)
  data.append('course', course)
  return axios.post(fileUrl, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const getFile = id => {
  return axios.get(`${fileUrl}/${id}`)
}
