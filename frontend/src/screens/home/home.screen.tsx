import React from 'react';
import { View, Text, Alert, TouchableOpacity, Image } from 'react-native';
import MyButton from 'components/MyButton';
import BottomNav from 'components/BottomNav';
import { getMainData } from '@api/user.api';
import { useAuth } from '@hooks/auth.hooks';
import { useHome } from '@hooks/home.hooks';
import { FlatList } from 'react-native-gesture-handler';
import { useAudioPlayer } from '@hooks/player.hooks';

export default function HomeScreen({ navigation }: any) {
  const { user, logout } = useAuth();
  const { songs } = useHome();
  const { selectTrack } = useAudioPlayer();

  const handleGet = async () => {
		try{
			const data = await getMainData();
			Alert.alert('Get', data);
		} catch (error: any) {
			Alert.alert('Get', error.message);
		}
	}

  return (
	  <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingTop:35 }}>
      		{/* <Text style={{ fontSize: 24 }}>Welcome {user?.usejrname} !</Text> */}
      		<Text style={{ fontSize: 24 }}>Home Screen</Text>
		<View style={{ flex: 1, paddingTop: 0, alignItems: "center" }}>
		<FlatList data={songs} keyExtractor={(item) => item.fileId} renderItem={({ item }) => (
			<TouchableOpacity onPress={async () => { await selectTrack(item, navigation)}}>
				<View style={{ flexDirection: "row", padding: 10, alignItems: "center", paddingLeft: 0 }}>
					<Image source={{ uri: item.thumbnail }} style={{ width: 100, height: 70, borderRadius: 8, marginRight: 10 }} />
					<Text style={{ fontSize: 16, flexShrink: 1 }}>{item.title}</Text>
				</View>
			</TouchableOpacity>
		)}>
		</FlatList>
			</View>
		<View style={{paddingBottom: 50, flexDirection: "row"}}>
			<MyButton title="Logout" onPress={() => logout()} />
			<MyButton title="Get" onPress={handleGet} />
			{/* <MyButton title="Player Screen" onPress={()=>{navigation.navigate('Player')}} /> */}
		</View>
		<BottomNav navigation={navigation} active="Home" />
	</View>
	
  );
}
