import React from 'react';
import {
	StyleSheet, Image, Text, View,
} from 'react-native';

import Utilities from '../Controllers/Utilities';
import Config from '../Config';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	profilePic: {
		width: 150,
		height: 150,
		borderRadius: 50,
	},
	profileName: {
		fontWeight: 'bold',
	},
	profileScore: {
		fontSize: 32,
		color: Config.mainColor,
	},
});

/**
 *  props: {
 *  }
 */
class UserInfo extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Image
					style={styles.profilePic}
					source={{ uri: this.props.user.image ? this.props.user.image : 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
				/>
				<Text style={styles.profileName}>{this.props.user.name}</Text>
				<Text style={styles.profileScore}>{`Score: ${this.props.user.score}`}</Text>
			</View>
		);
	}
}

export default UserInfo;
