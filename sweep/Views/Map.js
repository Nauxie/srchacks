import React from 'react';
import { MapView } from 'expo';
import Info from './Info';

class Map extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			markers: {},
			clicked: null,
			isLoading: true,
		};

		this.loadMarkers = this.loadMarkers.bind(this);
		this.placeMarkers = this.placeMarkers.bind(this);
		this.markerClicked = this.markerClicked.bind(this);
		this.refreshMarkers = this.refreshMarkers.bind(this);
	}

	componentDidMount() {
		this.loadMarkers();
	}

	loadMarkers() {
		const markers = {};
		// call to firebase and fill markers
		markers[741365] = {
			title: 'Plastic Bag',
			points: 5,
			latitude: 37.78925,
			longitude: -122.4334,
		};
		markers[3498] = {
			title: 'Plastic Bag 2',
			points: 8,
			latitude: 37.7865,
			longitude: -122.4314,
		};

		this.setState({ markers, isLoading: false });
		// set this.state.markers to markers
	}

	placeMarkers() {
		const markers = [];
		if (this.state.isLoading) {
			return (null);
		}

		Object.keys(this.state.markers).forEach((m) => {
			console.log(m);
			const marker = this.state.markers[m];
			console.log(marker);
			const coords = {
				latitude: marker.latitude,
				longitude: marker.longitude,
			};

			markers.push(
				<MapView.Marker
					identifier={m}
					coordinate={coords}
					title={marker.title}
					description={`${marker.points} points`}
					onPress={e => this.markerClicked(e)}
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
			console.log(this.state.markers);
			let markers = this.state.markers;
			delete markers[this.state.clicked];
			this.setState({ markers, clicked: null });
		}
		else {
			this.setState({ clicked: null });
		}
	}

	render() {
		if (this.state.clicked == null) {
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
					{this.placeMarkers()}
				</MapView>
			);
		}
		return (
			<React.Fragment>
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
				/>
				<Info
					data={this.state.markers[this.state.clicked]}
					close={this.refreshMarkers}
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
