import { createStackNavigator } from 'react-navigation';

import Map from './Views/Map';
import User from './Views/User';

const App = createStackNavigator({
	Map: { screen: Map },
	User: { screen: User },
});

export default App;
