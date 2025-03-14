import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_ENDPOINT, AUTH_TOKEN } from '@config/config.index';

console.log(API_ENDPOINT);

// Create an Axios instance
const api = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
	const token = await SecureStore.getItemAsync(AUTH_TOKEN);
	if (token) {
	  config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
  });

export default api;
