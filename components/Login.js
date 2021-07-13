import React, { useState } from 'react';
import { StyleSheet, View, Button, TextInput, Alert } from 'react-native';
import firebase from 'firebase';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onLogin = () => {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((res) => {
				Alert.alert('LoggedIn Successfully');
			})
			.catch((err) => {
				Alert.alert('Opp! Something Went Wrong');
			});
	};

	return (
		<View style={styles.container}>
			<TextInput
				placeholder="email here...."
				onChangeText={(email) => setEmail(email)}
			/>
			<TextInput
				placeholder="password here...."
				secureTextEntry={true}
				onChangeText={(password) => setPassword(password)}
			/>
			<Button title="Login" onPress={onLogin} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default Login;
