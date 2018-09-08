import { AsyncStorage } from 'react-native';

const defaultUser = {
	id: 0,
	type: 'user',
	name: 'User',
	history: [
		{
			id: 0,
			type: 'trash',
			score: 1,
		},
	],
	getScore: () => this.history.reduce(
		(accumulator, currentValue) => accumulator + currentValue.score,
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
		return { type: 'success', data: value };
	} catch (error) {
		return { type: 'error', data: error };
	}
};

const init = async () => {
	await setLocalUser(defaultUser);
};

export {
	init,
	getLocalUser,
	setLocalUser,
};
