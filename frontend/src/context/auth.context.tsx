import { createContext, useState, useEffect, useContext } from 'react';
import { loginUser } from '../api/user.api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { AuthContextType, User } from '../types/context.types';
import { Alert } from 'react-native';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: any ) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error loading user:", error);
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (username: string, password: string) => {
	try {
		const userData = await loginUser(username, password);
		const user: User = {id: userData.user.id, username: userData.user.username};
		await SecureStore.setItemAsync('authToken', userData.token);
		await AsyncStorage.setItem('user', JSON.stringify(user));
		setUser(user);
		return user;
	} catch (error: any) {
		console.log('onLogin error:', error.message);
		Alert.alert('Login Failed', error.message);
	}
  };

  const logout = async () => {
	try {
		await SecureStore.deleteItemAsync('authToken');
		await AsyncStorage.removeItem('user');
		setUser(null);
		return;
	} catch (error: any) {
		console.log('Logout error:', error.message);
		alert('Logout Failed');
	}
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading}}>
      {children}
    </AuthContext.Provider>
  );
}
