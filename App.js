import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as firebase from 'firebase';
import * as Notifications from 'expo-notifications';

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

// Notifications options
Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
});

async function schedulePushNotification() {
	await Notifications.scheduleNotificationAsync({
		content: {
			title: "You've got mail! 📬",
			body: 'Here is the notification body',
			data: { data: 'Data goes here' },
		},
		trigger: { seconds: 2 },
	});
}

export default function App() {
	const [loaded, setLoaded] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);

	const [notification, setNotification] = useState(false);
	const notificationListener = useRef();
	const responseListener = useRef();

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

		notificationListener.current =
			Notifications.addNotificationReceivedListener((notification) => {
				setNotification(notification);
			});

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener((response) => {
				console.log(response);
			});

		return () => {
			Notifications.removeNotificationSubscription(
				notificationListener.current,
			);
			Notifications.removeNotificationSubscription(responseListener.current);
		};
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
			<View>
				<Text>User is logged in</Text>
				<Button title="logout" onPress={() => logout()} />
			</View>

			<View>
				<View style={{ alignItems: 'center', justifyContent: 'center' }}>
					<Text>
						Title: {notification && notification.request.content.title}{' '}
					</Text>
					<Text>Body: {notification && notification.request.content.body}</Text>
					<Text>
						Data: {notification && notification.request.content.data.data}
					</Text>
				</View>
				<Button
					title="Press to schedule a notification"
					onPress={async () => {
						await schedulePushNotification();
					}}
				/>
			</View>
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
