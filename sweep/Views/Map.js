import React from 'react';
import { MapView } from 'expo';
import { StyleSheet } from 'react-native';

import Info from './Info';
import RoundedButton from '../Components/RoundedButton';

const styles = StyleSheet.create({
	basicFlex: {
		flex: 1,
	},
	addMarkerButton: {
		right: 16,
		bottom: 16,
	},
});

class Map extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			markers: {},
			clicked: null,
			isLoading: true,
			fire: this.props.fire,
		};

		this.placeMarkers = this.placeMarkers.bind(this);
		this.markerClicked = this.markerClicked.bind(this);
		this.refreshMarkers = this.refreshMarkers.bind(this);
	}

	async componentDidMount() {
		const markers = await this.state.fire.getMarkers();

		const Geolocation = navigator.geolocation;
		Geolocation.getCurrentPosition((loc) => {
			markers.curr = {
				title: 'You!',
				points: '∞',
				latitude: loc.coords.latitude,
				longitude: loc.coords.longitude,
			};
			console.log(markers);
			this.setState({ markers, isLoading: false });
		});
	}

	placeMarkers() {
		const markers = [];
		if (this.state.isLoading) {
			return (null);
		}

		Object.keys(this.state.markers).forEach((markerKey) => {
			const marker = this.state.markers[markerKey];
			const coords = {
				latitude: marker.latitude,
				longitude: marker.longitude,
			};

			markers.push(
				<MapView.Marker
					identifier={markerKey}
					coordinate={coords}
					title={marker.title}
					description={`${marker.points} points`}
					onPress={e => this.markerClicked(e)}
					key={markerKey}
					pinColor={(markerKey === 'curr') ? 'blue' : null}
				/>,
			);
		});
		return (markers);
	}

	markerClicked(e) {
		this.setState({ clicked: e.nativeEvent.id });
	}

	refreshMarkers(picked) {
		if (picked) {
			const { markers } = this.state;
			delete markers[this.state.clicked];
			this.setState({ markers, clicked: null });
		} else {
			this.setState({ clicked: null });
		}
	}

	render() {
		if (this.state.clicked == null) {
			return (
				<React.Fragment>
					<MapView
						style={styles.basicFlex}
						initialRegion={{
							latitude: 37.785834, // this.currentLocation('latitude'),
							longitude: -122.406417, // this.currentLocation('longitude'),
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421,
						}}
					>
						{this.placeMarkers()}
					</MapView>
					<RoundedButton
						style={styles.addMarkerButton}
						onPress={() => this.props.navigation.navigate('Camera')}
						icon="add"
					/>
				</React.Fragment>
			);
		}
		console.log(this.state.clicked);
		return (
			<React.Fragment>
				<MapView
					style={styles.basicFlex}
					initialRegion={{
						latitude: 37.78825,
						longitude: -122.4324,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
				/>
				<Info
					id={this.state.clicked}
					data={this.state.markers[this.state.clicked]}
					close={this.refreshMarkers}
					fire={this.state.fire}
				/>
			</React.Fragment>
		);
	}
}

Map.navigationOptions = {
	title: 'Map',
};

export default Map;

/*
  Keystore password: 3828eb7f0d3e1fa93af7c1a719159e70
  Key alias:         QGtob29tZWlrL3NXRWVwLXNsdWc=
  Key password:      e6095478947eb19ae54f6a32257dce15
*/
