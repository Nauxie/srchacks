import React from 'react';
import {
	StyleSheet, Text, View, FlatList, Image, RefreshControl, onRefresh,
} from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		width: '100%',
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

class Friends extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  refreshing: false,
		  friends: [
				{
					id: 1,
					name: 'Alma Hall',
					image: 'https://randomuser.me/api/portraits/women/66.jpg',
					score: 156,
				},
				{
					id: '2',
					name: 'Alfred Wells',
					image: 'https://randomuser.me/api/portraits/men/51.jpg',
					score: 119,
				},
				{
					id: 3,
					name: 'Glen Beck',
					image: 'https://randomuser.me/api/portraits/men/59.jpg',
					score: 88,
				},
				{
					id: 4,
					name: 'Melvin Rogers',
					image: 'https://randomuser.me/api/portraits/men/57.jpg',
					score: 54,
				},
				{
					id: 5,
					name: 'Tracey Jordan',
					image: 'https://randomuser.me/api/portraits/women/52.jpg',
					score: 123,

				},
				{	id: 6,
					name: 'Victoria Fox',
					image: 'https://randomuser.me/api/portraits/women/96.jpg',
					score: 7

				}
				,
		  ].sort((a, b) => b.score - a.score),
		};

		this._onRefresh = this._onRefresh.bind(this);
	  }

	 _onRefresh() {
		this.setState({ refreshing: true });
		this.setState(prevState => ({ friends: prevState.friends.sort((a, b) => b.score - a.score), ...prevState }), () => {
			this.setState({ refreshing: false });
		});
	  }

	render() {
		const entry = ({ item }) => (
			<View style={styles.listItem}>
				<Image
  					style={{
						transform: [{ translateX: 14 }, { translateY: 7 }],
						borderRadius: 25,
   					width: 51,
    				height: 51,
    				resizeMode: Image.resizeMode.contain,
  					}}
  					source={{
    				uri:
     					 item.image,
  					}}
				/>
				<Text style={styles.listTitle}>
					{`${item.name} - ${item.score} points`}
				</Text>

			</View>
		);
		return (
			<View style={styles.container}>
				<FlatList
					refreshControl={(
						<RefreshControl
					  refreshing={this.state.refreshing}
					  onRefresh={this._onRefresh}
						/>
					)}
					data={this.state.friends}
					renderItem={entry}
					keyExtractor={item => `${item.id}`}
				/>
			</View>
		);
	}
}

Friends.navigationOptions = {
	title: 'Friends',
};

export default Friends;
