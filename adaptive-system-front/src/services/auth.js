import axios from 'axios'

const loginUrl = "http://localhost:8080/user/auth/login"

export const signIn = (data) =>
{
    return axios.post(loginUrl, data)
}

export const signUp = (data) =>
{
    return new Promise(resolve => { setTimeout(() => resolve(data), 50) })
}
