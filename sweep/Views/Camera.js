import React from 'react';
import {
	StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import { Camera, Permissions } from 'expo';

const styles = StyleSheet.create({
	basicFlex: {
		flex: 1,
	},
	innerCameraView: {
		flex: 1,
		backgroundColor: 'transparent',
		flexDirection: 'row',
	},
	cameraTouchableOpacity: {
		flex: 0.1,
		alignSelf: 'flex-end',
		alignItems: 'center',
	},
	cameraInfoText: {
		fontSize: 18,
		marginBottom: 10,
		color: 'white',
	},
});

export default class CameraView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasCameraPermission: null,
			type: Camera.Constants.Type.back,
		};
	}

	async componentWillMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({ hasCameraPermission: status === 'granted' });
	}

	render() {
		const { hasCameraPermission } = this.state;
		if (hasCameraPermission === null) {
			return <View />;
		} if (hasCameraPermission === false) {
			return <Text>No access to camera</Text>;
		}
		return (
			<View style={styles.basicFlex}>
				<Camera style={styles.basicFlex} type={this.state.type}>
					<View style={styles.innerCameraView}>
						<TouchableOpacity
							style={styles.cameraTouchableOpacity}
							onPress={() => {
								this.setState(prevState => ({
									type: prevState.type === Camera.Constants.Type.back
										? Camera.Constants.Type.front
										: Camera.Constants.Type.back,
								}));
							}}
						>
							<Text style={styles.cameraInfoText}>
								{' '}Flip{' '}
							</Text>
						</TouchableOpacity>
					</View>
				</Camera>
			</View>
		);
	}
}
