import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Config from '../Config';

const styles = StyleSheet.create({
	button: {
		position: 'absolute',
		backgroundColor: Config.mainColor,
		borderRadius: 50,
		width: 64,
		height: 64,
		right: 16,
		bottom: 16,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	icon: {
		paddingTop: 5,
	},
});

class AddMarkerButton extends React.Component {
	render() {
		return (
			<TouchableHighlight
				style={styles.button}
				onPress={this.props.onPress}
				underlayColor={Config.mainLight}
			>
				<Ionicons style={styles.icon} name="ios-add" size={40} color="#fff" />
			</TouchableHighlight>
		);
	}
}

export default AddMarkerButton;
