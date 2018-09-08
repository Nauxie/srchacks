import React from 'react';
import { StyleSheet, View } from 'react-native';

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
		return (<View style={styles.container} />);
	}
}

Map.navigationOptions = {
	title: 'User',
};

export default Map;
