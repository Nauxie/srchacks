// screen that pops up when marker is clicked

import React from 'react';
import {
	StyleSheet, Text, View, Button,
} from 'react-native';

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		left: 40,
		top: 60,
		width: 300,
		height: 500,
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
	},
});

class Info extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			title: this.props.data.title,
			points: this.props.data.points,
		};
	}

	render() {
		console.log(this.props.data);
		return (
			<View style={styles.container}>
				<Text style={{ fontSize: 30, margin: 10 }}> {this.state.title} </Text>
				<Text style={{ fontSize: 50, margin: 10 }}> {this.state.points} points </Text>
				<Button
					title="Close"
					onPress={this.props.close}
				/>
			</View>
		);
	}
}

export default Info;
