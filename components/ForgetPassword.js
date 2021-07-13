import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const ForgetPassword = () => {
	const [email, setEmail] = useState('');

	const forgotPassword = () => {
		console.log('forgotPassword');
	};

	return (
		<View style={{ flex: 1, justifyContent: 'center' }}>
			<TextInput
				placeholder="email here...."
				onChangeText={(email) => setEmail(email)}
			/>
			<Button title="Reset" onPress={() => forgotPassword()} />
		</View>
	);
};

export default ForgetPassword;
