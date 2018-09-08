import React from 'react';
import { Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import FriendsView from './Views/Friends';
import MapView from './Views/Map';
import ProfileView from './Views/Profile';

const MapScreen = MapView;
const ProfileScreen = createStackNavigator(
	{
		Profile: {
			screen: ProfileView,
			navigationOptions: {
				headerTitle: 'Profile',
				headerRight: (<Button
					onPress={() => alert('This is a button!')}
					title="Info"
					color="#fff"
				/>),
			},
		},
	},
);


const App = createBottomTabNavigator(
	{
		Friends: { screen: FriendsView },
		Home: { screen: MapScreen },
		Profile: { screen: ProfileScreen },
	},
	{
		initialRouteName: 'Home',
		navigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, tintColor }) => {
				const { routeName } = navigation.state;
				let iconName;
				if (routeName === 'Home') {
					iconName = `ios-navigate${focused ? '' : '-outline'}`;
				} else if (routeName === 'Profile') {
					iconName = `ios-contact${focused ? '' : '-outline'}`;
				} else if (routeName === 'Friends') {
					iconName = `ios-people${focused ? '' : '-outline'}`;
				}

				// You can return any component that you like here! We usually use an
				// icon component from react-native-vector-icons
				return <Ionicons name={iconName} size={32} color={tintColor} />;
			},
		}),
		tabBarOptions: {
			activeTintColor: '#0C9520',
			inactiveTintColor: 'gray',
		},
	},
);

export default App;
