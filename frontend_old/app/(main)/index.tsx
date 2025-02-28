import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import MyButton from 'components/MyButton';
import { getMainData } from '@api/auth';
import { useAuthActions } from 'hooks/authHook';
import { useAuth } from 'context/authContext';

export default function MainScreen() {
  const {logout} = useAuthActions();
  const { user } = useAuth();

  const handleGet = async () => {
		try{
			const data = await getMainData();
			Alert.alert('Get', data);
		} catch (error: any) {
			Alert.alert('Get', error.message);
		}
	}

  return (
	  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      		<Text style={{ fontSize: 24 }}>Welcome {user?.name} !</Text>
      		<Text style={{ fontSize: 24 }}>Home Screen</Text>
    	</View>
		<View style={{paddingBottom: 100}}>
			<MyButton title="Logout" onPress={logout} />
			<MyButton title="Get" onPress={handleGet} />
		</View>
	</View>
	
  );
}
