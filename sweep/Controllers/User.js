import { AsyncStorage } from 'react-native';

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


export {
  getLocalUser,
  setLocalUser,
};
