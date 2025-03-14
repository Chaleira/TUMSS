import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useAuth } from "../../hooks/auth.hooks";
import MyButton from "../../components/MyButton";
import { getMainData } from "../../api/user.api";


export function RegisterScreen({ navigation }: any) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const { register } = useAuth();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>TUMSS</Text>

			<TextInput style={styles.input} placeholder="Username" placeholderTextColor="#aaa" value={username} onChangeText={setUsername} />

			<TextInput style={styles.input} placeholder="Password" placeholderTextColor="#aaa" value={password} onChangeText={setPassword} secureTextEntry />
			<TextInput style={styles.input} placeholder="Repeat Password" placeholderTextColor="#aaa" value={password2} onChangeText={setPassword2} secureTextEntry />
			<TouchableOpacity
				style={styles.button}
				onPress={async () => {
					if (password !== password2) {
						alert("Passwords do not match");
						return
					}
					if (await register(username, password))
						navigation.navigate('Login');
				}}
			>
				<Text style={styles.buttonText}>Register</Text>
			</TouchableOpacity>
			<MyButton title="Login" onPress={() => navigation.replace('Login')} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center", // Center vertically
		alignItems: "center", // Center horizontally
		backgroundColor: "#f4f4f4", // Light gray background
		padding: 20,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 20, // Space below the title
		color: "#333",
	},
	input: {
		width: "90%", // Make it responsive
		height: 50,
		backgroundColor: "#fff",
		paddingHorizontal: 15,
		borderRadius: 10,
		marginBottom: 15, // Space between inputs
		borderWidth: 1,
		borderColor: "#ddd",
		shadowColor: "#000", // Light shadow
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2, // Shadow for Android
	},
	button: {
		width: "90%",
		height: 50,
		backgroundColor: "#007bff", // Blue button
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		marginTop: 10,
	},
	buttonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
});
