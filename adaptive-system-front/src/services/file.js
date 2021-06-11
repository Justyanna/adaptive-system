import { default as axios } from './axios'

const fileUrl = 'file'

export const uploadFile = file => {
  return axios.post(fileUrl, file, { headers: { 'Content-Type': file.type } })
}
