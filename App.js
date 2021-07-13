import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// components
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import ForgetPassword from './components/ForgetPassword';

//intialize the Stack Navigator
const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen
					name="Home"
					component={Home}
					options={{ headerShown: false }}
				/>
				<Stack.Screen name="Register" component={Register} />
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="ForgetPassword" component={ForgetPassword} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
