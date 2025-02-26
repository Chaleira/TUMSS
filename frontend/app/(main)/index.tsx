import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { removeToken } from '../../api/api';
import MyButton from 'components/MyButton';

export default function MainScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    await removeToken();
    router.replace('/login'); // Redirect to login page after logout
  };

  return (
	  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      		<Text style={{ fontSize: 24 }}>Home Screen</Text>
    	</View>
		<View style={{paddingBottom: 100}}>
			<MyButton title="Logout" onPress={handleLogout} />
		</View>
	</View>
	
  );
}
