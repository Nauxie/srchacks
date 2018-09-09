import React from 'react';
import {
	StyleSheet, Text, View,
} from 'react-native';
import { Camera, Permissions } from 'expo';
import Clarifai from 'clarifai';

import RoundedButton from '../Components/RoundedButton';
import Config from '../Config';

const styles = StyleSheet.create({
	basicFlex: {
		flex: 1,
	},
	centerContent: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	innerCameraView: {
		flex: 1,
		backgroundColor: 'transparent',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	cameraInfoText: {
		fontSize: 18,
		marginBottom: 10,
		color: 'white',
	},
	takePhotoButton: {
		bottom: 16,
	},
	closeCameraButton: {
		backgroundColor: 'transparent',
		top: 16,
		right: 0,
	},
});


const clarifai = new Clarifai.App({
	apiKey: '37935bb2b4954757849cdc26d82a3386',
});
process.nextTick = setImmediate;

export default class CameraView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasCameraPermission: null,
			type: Camera.Constants.Type.back,
			isLoading: false,
			results: '',
		};
	}

	async componentWillMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({ hasCameraPermission: status === 'granted' });
	}

	pictureResults(data) {
		const result = data.type === 'success' ? (data.data.type === 'trash' ? 'TRASH!' : 'NOT TRASH!') : `Something went wrong... ${data.data}`;
		this.setState({ isLoading: false, results: result });
	}

	async snap() {
		if (this.camera && this.state.hasCameraPermission) {
			this.setState({ isLoading: true });
			try {
				const photo = await this.camera.takePictureAsync({ base64: true });

				const response = await clarifai.models.predict(Clarifai.GENERAL_MODEL, photo.base64);
				const { concepts } = response.outputs[0].data;
				let done = false;
				if (concepts && concepts.length > 0) {
					concepts.forEach((prediction) => {
						// If already done, don't do it again
						if (done) return;
						console.log(`${prediction.name} ${prediction.value}`);
						if ((prediction.name === 'cardboard' || prediction.name === 'glass' || prediction.name === 'metal' || prediction.name === 'paper' || prediction.name === 'plastic' || prediction.name === 'trash') && prediction.value >= 0.60) {
							this.pictureResults({ type: 'success', data: { type: 'trash', image: photo } });
							done = true;
						}
					});
				}
				if (!done) {
					this.pictureResults({ type: 'success', data: { type: 'none', image: photo } });
				}
			} catch (error) {
				this.pictureResults({ type: 'error', data: error });
			}
		}
	}

	render() {
		const { hasCameraPermission } = this.state;
		if (hasCameraPermission === null) {
			return <View />;
		} if (hasCameraPermission === false) {
			return <Text>No access to camera</Text>;
		}
		if (this.state.isLoading || this.state.results) {
			return (
				<View style={[styles.basicFlex, styles.centerContent]}>
					<RoundedButton
						style={styles.closeCameraButton}
						onPress={() => {
							this.props.navigation.navigate('Map');
						}}
						icon="close"
						underlayColor="transparent"
						color={Config.mainColor}
					/>
					<Text>{ this.state.isLoading ? 'Loading...' : this.state.results }</Text>
				</View>
			);
		}
		return (
			<View style={styles.basicFlex}>
				<Camera
					style={styles.basicFlex}
					type={this.state.type}
					ref={(ref) => { this.camera = ref; }}
				>
					<View style={styles.innerCameraView}>
						<RoundedButton
							style={styles.closeCameraButton}
							onPress={() => {
								this.props.navigation.navigate('Map');
							}}
							icon="close"
							underlayColor="transparent"
						/>
						<RoundedButton
							style={styles.takePhotoButton}
							onPress={async () => this.snap()}
							icon="camera"
						/>
					</View>
				</Camera>
			</View>
		);
	}
}
