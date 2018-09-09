import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Config from './Config';

import FriendsView from './Views/Friends';
import MapView from './Views/Map';
import ProfileView from './Views/Profile';
import CameraView from './Views/Camera';
import LoginView from './Views/Login';
import Firebase from './Views/Firebase';

const fire = new Firebase();

const FriendsScreen = createStackNavigator(
	{
		Friends: {
			screen: () => <FriendsView fire={fire} />,
			navigationOptions: {
				headerTitle: 'Friends',
			},
		},
	},
);

const MapScreen = createStackNavigator(
	{
		Map: {
			screen: ({navigation}) => <MapView navigation={navigation} fire={fire} />,
			navigationOptions: {
				header: null,
			},
		},
		Camera: {
			screen: ({navigation}) => <CameraView navigation={navigation} fire={fire} />,
			navigationOptions: {
				header: null,
			},
		},
	},
	{
		initialRouteName: 'Map',
	},
);

const ProfileScreen = createStackNavigator(
	{
		Profile: {
			screen: () => <ProfileView localUser fire={fire} />,
			navigationOptions: {
				headerTitle: 'Profile',
				headerLeft: (<Ionicons onPress={() => alert('Settings!')} name="ios-settings-outline" size={32} color={Config.mainColor} />),
			},
		},
	},
);

const Root = createBottomTabNavigator(
	{
		Friends: { screen: FriendsScreen },
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
			activeTintColor: Config.mainColor,
			inactiveTintColor: 'gray',
		},
	},
);

class RootScreen extends React.Component {
	render() {
		return (
			<Root navigation={this.props.navigation} />
		);
	}
}
RootScreen.router = Root.router;

const LoginOrRoot = createStackNavigator(
	{
		Login: {
			screen: ({ navigation }) => <LoginView navigation={navigation} fire={fire} />,
			navigationOptions: {
				header: null,
			},
		},
		Root: {
			screen: RootScreen,
			navigationOptions: {
				header: null,
			},
		},
	},
	{
		initialRouteName: 'Login',
	},
);

export default LoginOrRoot;
