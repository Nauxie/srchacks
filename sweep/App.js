import { createStackNavigator } from 'react-navigation';

import MapView from './Views/Map';
import UserView from './Views/User';

const App = createStackNavigator({
	Map: { screen: MapView },
	User: { screen: UserView },
});

export default App;
