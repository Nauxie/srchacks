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
			fire: this.props.fire,
			id: this.props.id,
			title: this.props.data.title,
			points: this.props.data.points,
			coords: {
				latitude: this.props.data.latitude,
				longitude: this.props.data.longitude,
			},
			url: 'https://seeclickfix.com/files/comment_images/0004/6657/1c2c5060.png',
		};

		this.pickup = this.pickup.bind(this);
		this.navigate = this.navigate.bind(this);
	}

	async componentDidMount() {
		const url = await this.props.fire.getImage(this.props.id);
		this.setState({ url });
	}

	pickup() {
		const Geolocation = navigator.geolocation;
		Geolocation.getCurrentPosition((loc) => {
			if (loc.coords.latitude - this.state.coords.latitude <= 1.0010
				&& loc.coords.longitude - this.state.coords.longitude <= 1.0010) {
				this.state.fire.pickup(this.state.id);
				alert(`You earned ${this.state.points} points!`);
				this.props.close(true);
			} else {
				alert('You aren\'t close enough to the trash!');
				this.state.fire.postMarker();
				this.props.close(false);
			}
		});
	}

	navigate() {
		console.log(this.state.coords);
		openMap(this.state.coords);
	}

	render() {
		return (
			<View style={styles.container}>
				{this.state.title === 'You!'
					? <Image /> // profile pic
					: (
						<Image
							style={{ width: 275, height: 200, marginTop: 15 }}
							source={{
								uri: this.state.url,
								// crop: {
								// 	top: 40, bottom: 40,
								// },
							}}
						/>
					)
				}
				<Text style={{ fontSize: 30, margin: 10 }}> {this.state.title} </Text>
				<Text style={{ fontSize: 50, margin: 10 }}> {this.state.points} points </Text>
				{this.state.title === 'You!' ? null : (
					<React.Fragment>
						<Button
							title="Pick Up"
							onPress={this.pickup}
						/>
						<Button
							title="Directions"
							onPress={this.navigate} // open in Google Maps
						/>
					</React.Fragment>
				)
				}
				<Button
					title="Close"
					onPress={() => this.props.close(false)}
				/>
			</View>
		);
	}
}

export default Info;
