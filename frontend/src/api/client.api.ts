import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Define the base URL of your backend
// const API_URL = 'http://192.168.1.67:3000'; // Home
const API_URL = 'http://192.168.0.69:3000'; // Mobile
const TOKEN = "authToken";

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
	const token = await SecureStore.getItemAsync(TOKEN);
	if (token) {
	  config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
  });

export default api;
