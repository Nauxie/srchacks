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
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	icon: {
		paddingTop: 5,
	},
});

class RoundedButton extends React.Component {
	render() {
		return (
			<TouchableHighlight
				style={[styles.button, this.props.style]}
				onPress={this.props.onPress}
				underlayColor={this.props.underlayColor || Config.mainLight}
			>
				<Ionicons style={styles.icon} name={`ios-${this.props.icon}`} size={40} color={this.props.color || '#fff'} />
			</TouchableHighlight>
		);
	}
}

export default RoundedButton;
