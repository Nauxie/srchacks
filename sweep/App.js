import React from 'react';

import SplashScreen from './Views/SplashScreen';
import Root from './Root';
import UserDB from './Controllers/UserDB';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			initialized: false,
		};
	}

	async componentWillMount() {
		console.log('Initializing...');
		// Initialize the user database
		await UserDB.init();
		console.log(`User has loaded ${JSON.stringify((await UserDB.getLocalUser()).data)}`);
		this.setState({ initialized: true });
		console.log('Done!');
	}

	render() {
		const { initialized } = this.state;
		if (!initialized) {
			return <SplashScreen />;
		}
		return (
			<Root />
		);
	}
}

export default App;
