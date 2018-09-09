import React from 'react';
import {
	StyleSheet, Text, View, Button, Image,
} from 'react-native';
import openMap from 'react-native-open-maps';

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		left: 40,
		top: 60,
		width: 300,
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
			coords: {
				latitude: this.props.data.latitude,
				longitude: this.props.data.longitude,
			},
		};

		this.pickup = this.pickup.bind(this);
		this.navigate = this.navigate.bind(this);
	}

	pickup() {
		alert(`You earned ${this.state.points} points!`);
		this.props.close();
	}

	navigate() {
		console.log(this.state.coords);
		openMap(this.state.coords);
	}

	render() {
		console.log(this.props.data);
		return (
			<View style={styles.container}>
				<Image
					style={{ width: 275, height: 200, marginTop: 15 }}
					source={{
						uri: 'https://seeclickfix.com/files/comment_images/0004/6657/1c2c5060.png',
						crop: {
							top: 40, bottom: 40,
						},
					}}
				/>
				<Text style={{ fontSize: 30, margin: 10 }}> {this.state.title} </Text>
				<Text style={{ fontSize: 50, margin: 10 }}> {this.state.points} points </Text>
				<Button
					title="Pick Up"
					onPress={this.pickup}
				/>
				<Button
					title="Directions"
					onPress={this.navigate} // open in Google Maps
				/>
				<Button
					title="Close"
					onPress={this.props.close}
				/>
			</View>
		);
	}
}

export default Info;
