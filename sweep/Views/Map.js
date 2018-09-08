import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

class Map extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				{/* <Text> sWEep </Text> */}
				{/* <Text> 我很聪明 </Text> */}
				<MapView
					initialRegion={{
						latitude: 37.78825,
						longitude: -122.4324,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
				/>
			</View>
		);
	}
}

Map.navigationOptions = {
	title: 'Map',
};

export default Map;
