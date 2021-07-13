import React from 'react';
import { View, Button } from 'react-native';

const Home = ({ navigation }) => {
	return (
		<View style={{ flex: 1, justifyContent: 'center' }}>
			<Button
				title="Register"
				onPress={() => navigation.navigate('Register')}
			/>
			<Button title="Login" onPress={() => navigation.navigate('Login')} />
			<Button
				title="Forget Password"
				onPress={() => navigation.navigate('ForgetPassword')}
			/>
		</View>
	);
};

export default Home;
