import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { API_ENDPOINT, AUTH_TOKEN } from "@config/config.index";
import { useAuth } from "@hooks/auth.hooks";

console.log(API_ENDPOINT);

// const logoutt = async () => {
// 	const { logout } = useAuth();
// 	console.log("Logging out due to 401/403");
// 	logout();
//   };

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

export const setupInterceptors = (logout: any) => {
	api.interceptors.response.use(
		(response) => response, // If response is OK, return it
		async (error) => {
			const { response } = error;
			console.log("Response Status: ", response?.status);

			if (response?.status === 401 || response?.status === 403) {
				logout(); // Call logout from context
			}

			return Promise.reject(error);
		}
	);
};

export default api;
