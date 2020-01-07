import axios from 'axios'

export default function AxiosAuth () {
  const token = localStorage.getItem('token')

  const instance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  })
  return instance
}
