import axios from 'axios';

export default function AxiosAuth() {
	const token = localStorage.getItem('token');

	const instance = axios.create({
		baseURL: 'https://pure-retail-ft-stripe-4tp9te3a.herokuapp.com',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
			'Access-Control-Allow-Origin': 'http://localhost:3000'
		}
	});
	return instance;
}
