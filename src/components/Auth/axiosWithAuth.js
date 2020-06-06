import axios from 'axios';

export default function AxiosAuth() {
  const token = localStorage.getItem('token');

  const instance = axios.create({
    // withCredentials: true,

    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
      'Access-Control-Allow-Origin': 'http://localhost:3000',
    },
  });
  return instance;
}
