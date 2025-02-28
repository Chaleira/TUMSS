import React from 'react';
import { View, Text, Alert } from 'react-native';
import MyButton from 'components/MyButton';
import { getMainData } from '@api/user.api';
import { useAuth } from '@hooks/auth.hooks';

export function PlaylistScreen({ navigation }: any) {
  const { user } = useAuth();

  return (
	  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      		<Text style={{ fontSize: 24 }}>Welcome {user?.username} !</Text>
      		<Text style={{ fontSize: 24 }}>Playlist Screen</Text>
    	</View>
	</View>
	
  );
}
