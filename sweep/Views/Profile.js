import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

class Profile extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>Profile View</Text>
			</View>
		);
	}
}

Profile.navigationOptions = {
	title: 'Profile',
};

export default Profile;
