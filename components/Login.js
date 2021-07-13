import React, { useState } from 'react';
import { View, Button, TextInput } from 'react-native';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onLogin = () => {
		console.log('Login');
	};

	return (
		<View style={{ flex: 1, justifyContent: 'center' }}>
			<TextInput
				placeholder="email here...."
				onChangeText={(email) => setEmail(email)}
			/>
			<TextInput
				placeholder="password here...."
				secureTextEntry={true}
				onChangeText={(password) => setPassword(password)}
			/>
			<Button title="Login" onPress={() => onLogin()} />
		</View>
	);
};

export default Login;
