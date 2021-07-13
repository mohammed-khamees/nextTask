import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as firebase from 'firebase';

// components
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import ForgetPassword from './components/ForgetPassword';

//intialize the Stack Navigator
const Stack = createStackNavigator();

// firebase configs
const firebaseConfig = {
	apiKey: 'AIzaSyARkpITwcV4BhAOMy5lCy6VXAHUSCdeMLM',
	authDomain: 'login-281da.firebaseapp.com',
	projectId: 'login-281da',
	storageBucket: 'login-281da.appspot.com',
	messagingSenderId: '540423173274',
	appId: '1:540423173274:web:31eb57953e1d3b6d8a5b23',
	measurementId: 'G-S87VT2Q9L2',
};

if (firebase.apps.length === 0) {
	firebase.initializeApp(firebaseConfig);
}

export default function App() {
	const [loaded, setLoaded] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			if (!user) {
				setLoaded(true);
				setLoggedIn(false);
			} else {
				setLoaded(true);
				setLoggedIn(true);
			}
		});
	}, []);

	const logout = async () => {
		await firebase.auth().signOut();
		setLoaded(true);
		setLoggedIn(false);
	};

	if (!loaded) {
		return (
			<View style={styles.container}>
				<Text>Loading</Text>
			</View>
		);
	}

	if (!loggedIn) {
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

	return (
		<View style={styles.container}>
			<Text>User is logged in</Text>
			<Button title="logout" onPress={() => logout()} />
		</View>
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
