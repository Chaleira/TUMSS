import React from 'react';
import { View, Text, Alert } from 'react-native';
import MyButton from 'components/MyButton';
import { getMainData } from '@api/user.api';
import { useAuthActions } from '@hooks/auth.hooks';
import { useAuth } from 'context/auth.context';

export default function HomeScreen({ navigation }: any) {
  const { user } = useAuth();
  const { logout, onLogout } = useAuthActions();

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
      		<Text style={{ fontSize: 24 }}>Welcome {user?.username} !</Text>
      		<Text style={{ fontSize: 24 }}>Home Screen</Text>
    	</View>
		<View style={{paddingBottom: 100}}>
			<MyButton title="Logout" onPress={() => logout(navigation)} />
			<MyButton title="onLogout" onPress={onLogout} />
			<MyButton title="Get" onPress={handleGet} />
		</View>
	</View>
	
  );
}
