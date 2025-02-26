import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import  { loginUser, getMainData, logoutUser }  from '../api/auth';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userData = await loginUser(username, password);
	  router.replace('/(main)');
      Alert.alert('Login Success', `Welcome ${userData.user.username}`);
    } catch (error: any) {
		console.log('Login error:', error.message);
      	Alert.alert('Login Failed', error.message);
    }
  };

  const handleGet = async () => {
	try {
		const data = await getMainData();
		Alert.alert('Data received', data);
	} catch (error: any) {
		console.log('Get main data error:', error.message);
		Alert.alert('Error', error.message);
	}
}

	const handleLogout = async () => {
		try {
			await logoutUser();
			Alert.alert('Logout Success', 'You have been logged out');
		} catch (error) {
			Alert.alert('Logout Failed', 'An error occurred');
		}
	};

	return (
		<View style={styles.container}>
		  <Text style={styles.title}>TUMSS</Text>
		  
		  <TextInput 
			style={styles.input} 
			placeholder="Username" 
			placeholderTextColor="#aaa"
			value={username}
			onChangeText={setUsername}
		  />
		  
		  <TextInput 
			style={styles.input} 
			placeholder="Password" 
			placeholderTextColor="#aaa"
			value={password}
			onChangeText={setPassword}
			secureTextEntry 
		  />
	
		  <TouchableOpacity style={styles.button} onPress={handleLogin}>
			<Text style={styles.buttonText}>Login</Text>
		  </TouchableOpacity>
		</View>
	  );
};

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  justifyContent: 'center', // Center vertically
	  alignItems: 'center', // Center horizontally
	  backgroundColor: '#f4f4f4', // Light gray background
	  padding: 20,
	},
	title: {
	  fontSize: 28,
	  fontWeight: 'bold',
	  marginBottom: 20, // Space below the title
	  color: '#333',
	},
	input: {
	  width: '90%', // Make it responsive
	  height: 50,
	  backgroundColor: '#fff',
	  paddingHorizontal: 15,
	  borderRadius: 10,
	  marginBottom: 15, // Space between inputs
	  borderWidth: 1,
	  borderColor: '#ddd',
	  shadowColor: '#000', // Light shadow
	  shadowOffset: { width: 0, height: 2 },
	  shadowOpacity: 0.1,
	  shadowRadius: 4,
	  elevation: 2, // Shadow for Android
	},
	button: {
	  width: '90%',
	  height: 50,
	  backgroundColor: '#007bff', // Blue button
	  justifyContent: 'center',
	  alignItems: 'center',
	  borderRadius: 10,
	  marginTop: 10,
	},
	buttonText: {
	  color: '#fff',
	  fontSize: 18,
	  fontWeight: 'bold',
	},
  });

{/* <Button title="Get" onPress={handleGet} />
      <Button title="Logout" onPress={handleLogout} /> */}

export default LoginScreen;
