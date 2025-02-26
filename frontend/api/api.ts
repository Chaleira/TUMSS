import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the base URL of your backend
const API_URL = 'http://192.168.1.67:3000'; // Change this to match your backend

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
	const token = await AsyncStorage.getItem('authToken');
	if (token) {
	  config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
  });

// Function to set Authorization header dynamically
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const storeToken = async (token: string) => {
  await AsyncStorage.setItem('authToken', token);
  setAuthToken(token); // Update axios headers
};

export const getToken = async () => {
  return await AsyncStorage.getItem('authToken');
};

export const removeToken = async () => {
  await AsyncStorage.removeItem('authToken');
  setAuthToken(null);
};


export default api;
