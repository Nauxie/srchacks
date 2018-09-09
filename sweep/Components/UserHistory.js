import React from 'react';
import {
	StyleSheet, Text, FlatList, View,
} from 'react-native';

import Utilities from '../Controllers/Utilities';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: '#fafafa',
	},
	listItem: {
		width: '100%',

		// Borders around it
		backgroundColor: '#fff',
		borderTopColor: '#ddd',
		borderTopWidth: 1,
		borderBottomColor: '#ddd',
		borderBottomWidth: 1,
	},
	listTitle: {
		textAlign: 'left',
		padding: 15,
	},
});

/**
 *  props: {
 * 		history: {
 * 			id - int: {
 * 				title: name - string,
 * 				points: 1 - int,
 * 				longitude: long - int,
 * 				latitude: lat - int,
 * 			}
 * 		}
 *  }
 */
class UserHistory extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fire: this.props.fire,
			history: this.props.history,
		};
	}

	async componentDidMount() {
		const markers = await this.state.fire.getMarkers(false);
		// console.log(markers);
		const mine = [];
		for (const i of this.state.history) {
			mine.push(markers[i]);
		}

		this.setState({ history: mine });
	}

	render() {
		if (this.state.history.length === 0) {
			return (
				<View style={styles.container}>
					<Text>Go save the planet!</Text>
				</View>
			);
		}

		const entry = ({ item }) => (
			<View style={styles.listItem}>
				<Text style={styles.listTitle}>{`${item.title} - ${item.points} points`}</Text>
			</View>
		);

		return (
			<View style={styles.container}>
				<FlatList
					data={this.state.history}
					renderItem={entry}
					keyExtractor={item => item.id}
				/>
			</View>
		);
	}
}

export default UserHistory;
