import React, { useState } from 'react';
import { View, Button, TextInput } from 'react-native';

const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onRegister = () => {
		console.log('Register');
	};

	return (
		<View style={{ flex: 1, justifyContent: 'center' }}>
			<TextInput
				placeholder="name here...."
				onChangeText={(name) => setName(name)}
			/>
			<TextInput
				placeholder="email here...."
				onChangeText={(email) => setEmail(email)}
			/>
			<TextInput
				placeholder="password here...."
				secureTextEntry={true}
				onChangeText={(password) => setPassword(password)}
			/>
			<Button title="Register" onPress={() => onRegister()} />
		</View>
	);
};

export default Register;
