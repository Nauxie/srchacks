import { AsyncStorage } from 'react-native';

const defaultUser = {
	id: 0,
	type: 'user',
	name: 'User Name',
	image: 'http://www.stickpng.com/assets/images/585e4bf3cb11b227491c339a.png',
	history: { user: 'a' }, // FILL IN FROM FIREBASE IN SETLOCALUSER
	getScore: () => Object.values(this.history).reduce(
		(accumulator, currentValue) => accumulator + currentValue.points,
	),
};

const setLocalUser = async (user) => {
	try {
		await AsyncStorage.setItem('@Storage:user', JSON.stringify(user));
		return { type: 'success' };
	} catch (error) {
		return { type: 'error', data: error };
	}
};

const getLocalUser = async () => {
	try {
		const value = await AsyncStorage.getItem('@Storage:user');
		return { type: 'success', data: JSON.parse(value) };
	} catch (error) {
		return { type: 'error', data: error };
	}
};

const addMarker = async (marker) => {
	const response = await getLocalUser();
	// If there was an error, return it
	if (response.type === 'error') {
		return response;
	}

	const copyMarker = Object.assign({}, marker);
	delete copyMarker.id;
	response.data.history[marker.id] = copyMarker;

	const setResponse = await setLocalUser(response.data);
	return setResponse;
};

const init = async () => {

	await setLocalUser(defaultUser);
};

export default {
	init,
	getLocalUser,
	setLocalUser,
};
