import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { API_ENDPOINT, AUTH_TOKEN } from "@config/config.index";
import { useAuth } from "@hooks/auth.hooks";

console.log(API_ENDPOINT);

const logout = async () => {
	const { logout } = useAuth();
	logout();
  };

// Create an Axios instance
const api = axios.create({
	baseURL: API_ENDPOINT,
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use(async (config) => {
	const token = await SecureStore.getItemAsync(AUTH_TOKEN);
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

api.interceptors.response.use(
	(response) => response, // If response is OK, return it
	async (error) => {
		const { response } = error;

		if (response?.status === 401 || response?.status === 403) {
			logout();
		}
		return Promise.reject(error);
	}
);

export default api;
