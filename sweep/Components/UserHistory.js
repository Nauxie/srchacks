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
	render() {
		const entry = ({ item }) => (
			<View style={styles.listItem}>
				<Text style={styles.listTitle}>{`${item.title} - ${item.points} points`}</Text>
			</View>
		);

		return (
			<View style={styles.container}>
				<FlatList
					data={Utilities.objectToArray(this.props.history)}
					renderItem={entry}
					keyExtractor={item => item.id}
				/>
			</View>
		);
	}
}

export default UserHistory;
