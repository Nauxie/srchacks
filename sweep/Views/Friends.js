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

class Friends extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>Leaderboard View</Text>
			</View>
		);
	}
}

Friends.navigationOptions = {
	title: 'Friends',
};

export default Friends;
