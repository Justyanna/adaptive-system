import { default as axios } from './axios'

const loginUrl = 'user/login'
const registerUrl = 'user'

export const signIn = data => {
  return axios.post(loginUrl, data)
}

export const signUp = data => {
  return axios.post(registerUrl, data)
}
