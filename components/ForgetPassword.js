import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import firebase from 'firebase';

const ForgetPassword = () => {
	const [email, setEmail] = useState('');

	const forgotPassword = () => {
		firebase
			.auth()
			.sendPasswordResetEmail(email)
			.then((res) => {
				Alert.alert('Please check your email...');
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
			<Button title="Reset" onPress={forgotPassword} />
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

export default ForgetPassword;
