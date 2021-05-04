import axios from 'axios'

const loginUrl = "http://localhost:8080/user/login"
const registerUrl = "http://localhost:8080/user"

export const signIn = (data) =>
{
    return axios.post(loginUrl, data)
}

export const signUp = (data) =>
{
    return axios.post(registerUrl, data)
}
