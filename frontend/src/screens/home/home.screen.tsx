import React from 'react';
import { View, Text, Alert } from 'react-native';
import MyButton from 'components/MyButton';
import { getMainData } from '@api/user.api';
import { useAuth } from '@hooks/auth.hooks';
import { useState, useMemo } from "react";

const ExpensiveCalculation = ({count}: any) => {
	const expensiveResult = useMemo(() => {
	  console.log("Calculating...");
	  return count * 2;
	}, [count]); // Recomputes only when count changes
  
	return <Text>Result: {expensiveResult}</Text>;
  };

export default function HomeScreen({ navigation }: any) {
  const { user, logout } = useAuth();
  const [count, setCount] = useState(1);

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
			<MyButton title="Logout" onPress={() => logout()} />
			<MyButton title="Get" onPress={handleGet} />
			<MyButton title="count" onPress={() => setCount(count + 1)} />
			<ExpensiveCalculation count={count} />
			<MyButton title="Get" onPress={()=>{navigation.navigate('Player')}} />
		</View>
	</View>
	
  );
}
