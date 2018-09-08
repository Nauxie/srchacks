import React from 'react';
import { MapView } from 'expo';
import View from 'react-native';
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
		this.markerClicked = this.markerClicked.bind(this);
	}

	componentDidMount() {
		this.loadMarkers();
	}

	loadMarkers() {
		const markers = {};
		// call to firebase and fill markers
		markers[741365] = {
			title: 'Aluminum Can',
			points: 5,
			latitude: 37.78925,
			longitude: -122.4334,
		};

		this.setState({ markers, isLoading: false });
		// set this.state.markers to markers
	}

	markerClicked(e) {
		this.setState({ clicked: e.nativeEvent.id });

		// display screen with more info
		// fetch data about this marker from this.state
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
					<MapView.Marker
						identifier="741365"
						coordinate={{
							latitude: 37.78925,
							longitude: -122.4334,
						}}
						title="Aluminum Can"
						description="5"
						onPress={e => this.markerClicked(e)}
					/>

					{/* {this.state.isLoading ? null : Object.keys(this.state.markers).forEach((m) => {
					console.log(m);
					const marker = this.state.markers[m];
					console.log(marker);
					const coords = {
						latitude: marker.latitude,
						longitude: marker.longitude,
					};

					return (
						<MapView.Marker
							identifier={m}
							coordinate={coords}
							title={marker.title}
							description={`${marker.points} points`}
							onPress={e => this.markerClicked(e)}
						/>
					);
				})} */}
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
					close={() => this.setState({ clicked: null })}
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
