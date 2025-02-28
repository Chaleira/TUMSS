import { loginUser } from "../api/auth";
import { User } from "../types/authType";
import { Alert } from "react-native";
import { useAuth } from "../context/authContext";

export const useAuthActions = () => {
	const { login, logout } = useAuth();

	const useLogin = async (username: string, password:string) => {
		try {
			const userData = await loginUser(username, password);
			const user: User = {
				id: userData.user.id,
				name: userData.user.username,
				token: userData.token
			}
			login(user);
		}
		catch (error: any) {
			console.log('Login error:', error.message);
			Alert.alert('Login Failed', error.message);
		}
	};

	return { useLogin, logout };
}