import React from 'react';
import { MapView } from 'expo';

class Map extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			markers: {},
		};

		this.loadMarkers = this.loadMarkers.bind(this);
		this.markerClicked = this.markerClicked.bind(this);
	}

	componentDidMount() {
		this.loadMarkers();
	}

	loadMarkers() {
		let markers = {};
		// call to firebase and fill markers
		markers[741365] = {
			title: 'Aluminum Can',
			points: 5,
			latitude: 37.78925,
			longitude: -122.4334,
		};

		this.setState({ markers: markers });
		// set this.state.markers to markers
	}

	markerClicked(e) {
		console.log(e.nativeEvent.id);

		// display screen with more info
		// fetch data about this marker from this.state
	}

	render() {
		console.log(this.state.markers);
		return (
			<MapView
				style={{
					flex: 1,
				}}
				initialRegion={{
					latitude: 37.78825,
					longitude: -122.4324,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
			>
				{this.state.isLoading ? null : Object.keys(this.state.markers).forEach((m) => {
					// for(let marker in this.state.markers)
					console.log(m);
					const marker = this.state.markers[m];
					console.log(marker);
					const coords = {
						latitude: marker.latitude,
						longitude: marker.longitude,
					};

					return (
						<MapView.Marker
							identifier={marker.id}
							coordinate={coords}
							title={marker.title}
							description={`${marker.points} points`}
							onPress={e => this.markerClicked(e)}
						/>
					);
				})}
			</MapView>
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
