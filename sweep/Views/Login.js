import React from 'react';
import {
	StyleSheet, Button, View, Text,
} from 'react-native';

import firebase from 'firebase';
import Expo from 'expo';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			fire: this.props.fire,
		};
	}

	async componentDidMount() {
		const obj = this;
		firebase.auth().onAuthStateChanged((user) => {
			if (user != null) {
				obj.props.navigation.navigate('Root');
				this.state.fire.setUserId(user);
			}
		});
	}

	async loginWithGoogle() {
		try {
			const result = await Expo.Google.logInAsync({
				// androidClientId: 'ANDROID IDC',
				iosClientId: '23813249783-s3kcbj16kml9j5epi25j8k5i33vlr5sv.apps.googleusercontent.com',
				scopes: ['profile'],
			});

			if (result.type === 'success') {
				// const credential = firebase.auth.GoogleAuthProvider.credential(null, result.accessToken);
				// console.log(result.user);
				this.state.fire.setUserId(result.user);
				try {
					// Sign in with credential from the Facebook user.
					// const userCred = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
					console.log(`Success! User: ${result.user.name}`);
				} catch (fireError) {
					console.error(fireError);
				}
			} else {
				// cancelled
			}
		} catch (error) {
			console.error(error);
		}

		/*
		// If need local user, get from DB
		if (this.props.localUser) {
			// Load the user data into state
			const user = await UserDB.getLocalUser();
			this.setState({ user: (user.type === 'success' ? user.data : {}) });
		}
		*/
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={{ fontSize: 28 }}>sWEep</Text>
				<Button title="Sign In with Google" onPress={async () => this.loginWithGoogle()} />
			</View>
		);
	}
}

export default Login;
